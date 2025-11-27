import React from 'react';
import { Link } from 'react-router-dom';

export function Rules() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 标题区域 */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">酒店报销政策说明</h1>
          <p className="text-center text-gray-300 mt-2">
            公司差旅报销政策详细说明与计算规则
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* 政策说明 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">报销政策说明</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                为规范公司差旅费用管理，确保费用报销的合理性和公平性，
                公司制定了酒店费用分段累计报销政策。该政策根据住宿标准的不同区间，
                采用差异化的承担比例，既保障了员工的基本住宿需求，
                又合理控制了公司成本。
              </p>
              <p>
                员工在差旅过程中，应根据实际业务需要选择合适档次的酒店，
                在标准范围内的费用由公司全额承担，超出部分按照既定比例分担。
              </p>
            </div>
          </div>

          {/* 计算规则 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">四段累计计算规则</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">第一段：不超过标准部分</h3>
                <p className="text-blue-700 text-sm">
                  当酒店费用不超过每晚住宿标准时，费用由公司100%承担。
                </p>
                <div className="mt-2 text-xs text-blue-600">
                  承担比例：公司 100%，个人 0%
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-2">第二段：超过标准至1.25倍标准</h3>
                <p className="text-green-700 text-sm">
                  当酒店费用超过标准但未达到1.25倍标准时，
                  超出部分由公司承担75%，个人承担25%。
                </p>
                <div className="mt-2 text-xs text-green-600">
                  承担比例：公司 75%，个人 25%
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">第三段：超过1.25倍至3倍标准</h3>
                <p className="text-yellow-700 text-sm">
                  当酒店费用超过1.25倍标准但未达到3倍标准时，
                  超出部分由公司和个人各承担50%。
                </p>
                <div className="mt-2 text-xs text-yellow-600">
                  承担比例：公司 50%，个人 50%
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2">第四段：超过3倍标准部分</h3>
                <p className="text-red-700 text-sm">
                  当酒店费用超过3倍标准时，超出部分由个人100%承担。
                </p>
                <div className="mt-2 text-xs text-red-600">
                  承担比例：公司 0%，个人 100%
                </div>
              </div>
            </div>
          </div>

          {/* 使用指南 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">使用指南</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">第一步：选择输入模式</h3>
                <p className="text-gray-600 text-sm">
                  系统支持两种输入方式：直接输入预订总价，
                  或分别输入每晚房价和住宿天数。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">第二步：输入基础信息</h3>
                <p className="text-gray-600 text-sm">
                  输入每晚住宿标准和住宿天数，
                  这两项为必填信息，用于计算标准金额。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">第三步：输入费用信息</h3>
                <p className="text-gray-600 text-sm">
                  根据选择的输入模式，输入相应的费用信息。
                  如果选择总价模式，输入预订总价；
                  如果选择分输入模式，输入每晚房价。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">第四步：选择特殊审批（如适用）</h3>
                <p className="text-gray-600 text-sm">
                  如果已获得特殊审批，可选择"已获得特殊审批全额承担"选项，
                  此时全部费用将由公司承担。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">第五步：查看计算结果</h3>
                <p className="text-gray-600 text-sm">
                  点击"计算"按钮后，系统将显示公司承担金额、个人承担金额，
                  以及详细的四段累计计算过程。
                </p>
              </div>
            </div>
          </div>

          {/* 注意事项 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">注意事项</h2>
            <div className="text-gray-600 space-y-2">
              <p>• 请确保输入信息的准确性，特别是住宿标准和天数</p>
              <p>• 计算结果仅供参考，最终报销金额以财务部门审核为准</p>
              <p>• 如有特殊情况，请提前与财务部门沟通确认</p>
              <p>• 建议保存计算结果截图，便于后续报销流程使用</p>
              <p>• 如对计算结果有疑问，可联系财务部门进行咨询</p>
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回计算器
          </Link>
        </div>
      </div>
    </div>
  );
}
