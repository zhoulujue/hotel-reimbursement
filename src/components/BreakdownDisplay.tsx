import React from 'react';
import { CalculationResult } from '../types';

interface BreakdownDisplayProps {
  result: CalculationResult;
}

export function BreakdownDisplay({ result }: BreakdownDisplayProps) {
  const formatCurrency = (amount: number) => {
    return `¥${amount.toFixed(2)}`;
  };

  if (result.approved) {
    return null; // 特殊审批不显示详细计算过程
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">详细计算过程</h3>
      
      <div className="space-y-3">
        {result.segments.map((segment, index) => {
          if (segment.amount === 0) return null; // 跳过金额为0的段
          
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800">
                  第{index + 1}段: {segment.range}
                </h4>
                <span className="text-sm text-gray-600">
                  金额: {formatCurrency(segment.amount)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600">公司承担:</span>
                    <span className="font-medium text-blue-700">
                      {formatCurrency(segment.companyAmount)}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    比例: {(segment.companyRatio * 100).toFixed(0)}%
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-600">个人承担:</span>
                    <span className="font-medium text-yellow-700">
                      {formatCurrency(segment.employeeAmount)}
                    </span>
                  </div>
                  <div className="text-xs text-yellow-600 mt-1">
                    比例: {(segment.employeeRatio * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">计算说明</h4>
        <div className="text-sm text-gray-600 space-y-2">
          <p>• 酒店费用按照四段累计法计算：</p>
          <ul className="ml-4 space-y-1">
            <li>第1段：不超过标准部分，公司100%承担</li>
            <li>第2段：超过标准至1.25倍标准，公司75%承担</li>
            <li>第3段：超过1.25倍至3倍标准，公司50%承担</li>
            <li>第4段：超过3倍标准部分，个人100%承担</li>
          </ul>
          <p>• 计算公式：公司承担 = Σ(各段金额 × 公司承担比例)</p>
        </div>
      </div>
    </div>
  );
}