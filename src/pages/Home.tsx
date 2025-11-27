import React, { useState } from 'react';
import { InputForm } from '../components/InputForm';
import { ResultDisplay } from '../components/ResultDisplay';
import { BreakdownDisplay } from '../components/BreakdownDisplay';
import { useCalculator } from '../hooks/useCalculator';
import { useFormValidation } from '../hooks/useFormValidation';
import { InputData } from '../types';

export function Home() {
  const [mode, setMode] = useState<'total' | 'pernight'>('total');
  const { state, calculate, clear } = useCalculator();
  const { errors, validateInput, clearErrors } = useFormValidation();

  const handleSubmit = (data: InputData) => {
    if (validateInput(data)) {
      calculate(data);
      clearErrors();
    }
  };

  const handleClear = () => {
    clear();
    clearErrors();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 标题区域 */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">酒店费用报销计算器</h1>
          <p className="text-center text-gray-300 mt-2">
            基于公司差旅报销政策的智能计算工具
          </p>
          <div className="text-center mt-4">
            <a
              href="https://bytedance.larkoffice.com/wiki/wikcnetUQ0trZ7MHaMmB5JYvOwh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              政策说明
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入表单 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">费用信息输入</h2>
              {state.result && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  清空
                </button>
              )}
            </div>
            
            <InputForm
              mode={mode}
              onModeChange={setMode}
              onSubmit={handleSubmit}
              errors={errors}
            />

            {state.error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{state.error}</p>
              </div>
            )}
          </div>

          {/* 右侧：结果显示 */}
          <div className="space-y-6">
            {state.isCalculating && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">计算中...</span>
                </div>
              </div>
            )}

            {state.result && !state.isCalculating && (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">计算结果</h2>
                  <ResultDisplay result={state.result} />
                </div>

                {!state.result.approved && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <BreakdownDisplay result={state.result} />
                  </div>
                )}
              </>
            )}

            {!state.result && !state.isCalculating && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">等待输入</h3>
                  <p className="text-gray-500">请在左侧输入酒店费用信息，然后点击计算按钮</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">使用说明</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• 支持两种输入模式：直接输入总价或分别输入每晚房价与住宿天数</p>
            <p>• 系统按照公司差旅报销政策自动计算公司与个人承担比例</p>
            <p>• 如已获得特殊审批，可选择"已获得特殊审批全额承担"选项</p>
            <p>• 计算结果包含详细的四段累计计算过程，便于财务审核</p>
          </div>
        </div>
      </div>
    </div>
  );
}
