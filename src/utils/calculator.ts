import { InputData, CalculationResult, SegmentCalculation } from '../types';

export class HotelReimbursementCalculator {
  calculate(input: InputData): CalculationResult {
    if (!input.standardPerNight || input.standardPerNight <= 0) {
      throw new Error('每晚住宿标准必须为正数');
    }
    if (!input.nights || input.nights <= 0) {
      throw new Error('住宿天数必须为正数');
    }
    if (input.inputMode === 'total') {
      if (input.totalAmount === undefined || input.totalAmount < 0) {
        throw new Error('总价无效');
      }
    } else {
      if (input.pricePerNight === undefined || input.pricePerNight < 0) {
        throw new Error('每晚房价无效');
      }
    }
    // 1. 计算总标准金额
    const totalStandard = input.standardPerNight * input.nights;
    
    // 2. 计算总价
    const totalAmount = input.inputMode === 'total' 
      ? input.totalAmount! 
      : input.pricePerNight! * input.nights;
    
    // 3. 特殊审批处理
    if (input.hasSpecialApproval) {
      return this.createApprovedResult(totalAmount, totalStandard, input.currency);
    }
    
    // 4. 分段计算
    const segments = this.calculateSegments(totalAmount, totalStandard, input.currency);
    
    // 5. 汇总结果
    const companyAmount = segments.reduce((sum, seg) => sum + seg.companyAmount, 0);
    const employeeAmount = segments.reduce((sum, seg) => sum + seg.employeeAmount, 0);
    
    return {
      companyAmount,
      employeeAmount,
      totalAmount,
      standardAmount: totalStandard,
      segments,
      approved: false,
      currency: input.currency
    };
  }
  
  private calculateSegments(total: number, standard: number, currency: 'CNY' | 'USD'): SegmentCalculation[] {
    const segments: SegmentCalculation[] = [];
    
    // 段0: 不超过标准部分
    const seg0Amount = Math.min(total, standard);
    segments.push({
      segment: '0',
      amount: seg0Amount,
      companyRatio: 1.0,
      employeeRatio: 0.0,
      companyAmount: seg0Amount * 1.0,
      employeeAmount: seg0Amount * 0.0,
      range: `≤ 标准 (${this.formatCurrency(standard, currency)})`
    });
    
    // 段1: 超过标准至1.25倍标准
    const seg1Max = standard * 1.25;
    const seg1Amount = Math.max(0, Math.min(total, seg1Max) - standard);
    segments.push({
      segment: '1',
      amount: seg1Amount,
      companyRatio: 0.75,
      employeeRatio: 0.25,
      companyAmount: seg1Amount * 0.75,
      employeeAmount: seg1Amount * 0.25,
      range: `${this.formatCurrency(standard, currency)} ~ 1.25×标准 (${this.formatCurrency(seg1Max, currency)})`
    });
    
    // 段2: 超过1.25倍至3倍标准
    const seg2Max = standard * 3;
    const seg2Amount = Math.max(0, Math.min(total, seg2Max) - seg1Max);
    segments.push({
      segment: '2',
      amount: seg2Amount,
      companyRatio: 0.5,
      employeeRatio: 0.5,
      companyAmount: seg2Amount * 0.5,
      employeeAmount: seg2Amount * 0.5,
      range: `1.25×标准 (${this.formatCurrency(seg1Max, currency)}) ~ 3×标准 (${this.formatCurrency(seg2Max, currency)})`
    });
    
    // 段3: 超过3倍标准部分
    const seg3Amount = Math.max(0, total - seg2Max);
    segments.push({
      segment: '3',
      amount: seg3Amount,
      companyRatio: 0.0,
      employeeRatio: 1.0,
      companyAmount: seg3Amount * 0.0,
      employeeAmount: seg3Amount * 1.0,
      range: `> 3×标准 (${this.formatCurrency(seg2Max, currency)})`
    });
    
    return segments;
  }
  
  private createApprovedResult(total: number, standard: number, currency: 'CNY' | 'USD'): CalculationResult {
    return {
      companyAmount: total,
      employeeAmount: 0,
      totalAmount: total,
      standardAmount: standard,
      segments: [],
      approved: true,
      currency
    };
  }
  
  private formatCurrency(amount: number, currency: 'CNY' | 'USD'): string {
    const symbol = currency === 'USD' ? '$' : '¥';
    return `${symbol}${amount.toFixed(2)}`;
  }
}
