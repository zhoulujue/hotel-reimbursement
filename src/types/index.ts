// 输入数据接口
export interface InputData {
  standardPerNight: number;
  nights: number;
  inputMode: 'total' | 'pernight';
  totalAmount?: number;
  pricePerNight?: number;
  hasSpecialApproval: boolean;
}

// 计算结果接口
export interface CalculationResult {
  companyAmount: number;
  employeeAmount: number;
  totalAmount: number;
  standardAmount: number;
  segments: SegmentCalculation[];
  approved: boolean;
}

// 分段计算详情
export interface SegmentCalculation {
  segment: '0' | '1' | '2' | '3';
  amount: number;
  companyRatio: number;
  employeeRatio: number;
  companyAmount: number;
  employeeAmount: number;
  range: string;
}

// 分段明细项
export interface BreakdownItem {
  label: string;
  amount: number;
  companyShare: number;
  employeeShare: number;
  description: string;
}

// 计算器状态
export interface CalculatorState {
  inputData: InputData | null;
  result: CalculationResult | null;
  isCalculating: boolean;
  error: string | null;
}

// UI状态
export interface UIState {
  currentMode: 'total' | 'pernight';
  showBreakdown: boolean;
  validationErrors: Record<string, string>;
}

// 应用状态
export interface AppState {
  calculator: CalculatorState;
  ui: UIState;
}