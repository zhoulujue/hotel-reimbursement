import React from 'react';
import { CalculationResult } from '../types';

interface ResultDisplayProps {
  result: CalculationResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const formatCurrency = (amount: number) => {
    return `¥${amount.toFixed(2)}`;
  };

  if (result.approved) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">计算结果（特殊审批）</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="text-sm font-medium text-gray-600 mb-2">公司承担金额</h4>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(result.companyAmount)}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-medium text-gray-600 mb-2">个人承担金额</h4>
              <p className="text-2xl font-bold text-gray-400">{formatCurrency(result.employeeAmount)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>说明：</strong>由于已获得特殊审批，全部费用由公司承担。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h4 className="text-sm font-medium text-blue-600 mb-2">公司承担金额</h4>
          <p className="text-3xl font-bold text-blue-700">{formatCurrency(result.companyAmount)}</p>
          <p className="text-sm text-blue-600 mt-1">
            占总费用的 {((result.companyAmount / result.totalAmount) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h4 className="text-sm font-medium text-yellow-600 mb-2">个人承担金额</h4>
          <p className="text-3xl font-bold text-yellow-700">{formatCurrency(result.employeeAmount)}</p>
          <p className="text-sm text-yellow-600 mt-1">
            占总费用的 {((result.employeeAmount / result.totalAmount) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">总费用：</span>
            <span className="font-medium">{formatCurrency(result.totalAmount)}</span>
          </div>
          <div>
            <span className="text-gray-600">标准金额：</span>
            <span className="font-medium">{formatCurrency(result.standardAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}