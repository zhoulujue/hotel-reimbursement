import React from 'react';
import { InputData } from '../types';

interface InputFormProps {
  mode: 'total' | 'pernight';
  onModeChange: (mode: 'total' | 'pernight') => void;
  onSubmit: (data: InputData) => void;
  errors: Record<string, string>;
}

export function InputForm({ mode, onModeChange, onSubmit, errors }: InputFormProps) {
  const [formData, setFormData] = React.useState<Partial<InputData>>({
    standardPerNight: undefined,
    nights: undefined,
    inputMode: mode,
    totalAmount: undefined,
    pricePerNight: undefined,
    hasSpecialApproval: false,
    currency: 'CNY'
  });

  const symbol = formData.currency === 'USD' ? '$' : '¥';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.standardPerNight && formData.nights) {
      onSubmit(formData as InputData);
    }
  };

  const handleInputChange = (field: keyof InputData, value: InputData[keyof InputData]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, inputMode: mode }));
  }, [mode]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 模式选择 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">输入模式</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="total"
              checked={mode === 'total'}
              onChange={(e) => onModeChange(e.target.value as 'total' | 'pernight')}
              className="mr-2"
            />
            直接输入总价
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="pernight"
              checked={mode === 'pernight'}
              onChange={(e) => onModeChange(e.target.value as 'total' | 'pernight')}
              className="mr-2"
            />
            输入每晚房价与天数
          </label>
        </div>
      </div>

      {/* 基础信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            每晚住宿标准 ({symbol}) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.standardPerNight || ''}
            onChange={(e) => handleInputChange('standardPerNight', parseFloat(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.standardPerNight ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="请输入每晚住宿标准"
          />
          {errors.standardPerNight && (
            <p className="text-red-500 text-sm">{errors.standardPerNight}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
          住宿天数 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={formData.nights || ''}
            onChange={(e) => handleInputChange('nights', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nights ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="请输入住宿天数"
          />
          {errors.nights && (
            <p className="text-red-500 text-sm">{errors.nights}</p>
          )}
        </div>
      </div>

      {/* 币种选择 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">币种</label>
        <select
          value={formData.currency}
          onChange={(e) => handleInputChange('currency', e.target.value as 'CNY' | 'USD')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="CNY">人民币 (¥)</option>
          <option value="USD">美元 ($)</option>
        </select>
      </div>

      {/* 模式专属输入 */}
      {mode === 'total' ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            预订总价 ({symbol}) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.totalAmount || ''}
            onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.totalAmount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="请输入预订总价"
          />
          {errors.totalAmount && (
            <p className="text-red-500 text-sm">{errors.totalAmount}</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            每晚房价 ({symbol}) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.pricePerNight || ''}
            onChange={(e) => handleInputChange('pricePerNight', parseFloat(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pricePerNight ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="请输入每晚房价"
          />
          {errors.pricePerNight && (
            <p className="text-red-500 text-sm">{errors.pricePerNight}</p>
          )}
        </div>
      )}

      {/* 特殊审批选择 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">特殊审批</label>
        <select
          value={formData.hasSpecialApproval ? 'true' : 'false'}
          onChange={(e) => handleInputChange('hasSpecialApproval', e.target.value === 'true')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="false">无特殊审批</option>
          <option value="true">已获得特殊审批全额承担</option>
        </select>
      </div>

      {/* 提交按钮 */}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          计算
        </button>
      </div>
    </form>
  );
}
