import React from 'react';
import { calculateFlightSplit, calculateUpgradeSplit } from '../utils/flightCalculator';

type Preset = 'economy100' | 'upgrade75' | 'custom';
type Mode = 'total' | 'upgrade';

export function FlightSplit() {
  const [mode, setMode] = React.useState<Mode>('total');
  const [total, setTotal] = React.useState<string>('');
  const [economy, setEconomy] = React.useState<string>('');
  const [upgrade, setUpgrade] = React.useState<string>('');
  const [preset, setPreset] = React.useState<Preset>('upgrade75');
  const [customPercent, setCustomPercent] = React.useState<string>('75');

  const companyPercent = (() => {
    switch (preset) {
      case 'economy100':
        return 100;
      case 'upgrade75':
        return 75;
      case 'custom':
        return Number(customPercent) || 0;
      default:
        return 75;
    }
  })();

  const { result, calcError } = React.useMemo(() => {
    if (mode === 'total') {
      const t = Number(total);
      if (total.trim() === '') return { result: null as ReturnType<typeof calculateFlightSplit> | null, calcError: null as string | null };
      if (Number.isNaN(t)) return { result: null, calcError: '输入有误' };
      try {
        const r = calculateFlightSplit(t, companyPercent);
        return { result: r, calcError: null };
      } catch (e: any) {
        return { result: null, calcError: e?.message || '输入有误' };
      }
    } else {
      const eAmt = Number(economy);
      const uAmt = Number(upgrade);
      if (economy.trim() === '' && upgrade.trim() === '') return { result: null as ReturnType<typeof calculateUpgradeSplit> | null, calcError: null as string | null };
      if (Number.isNaN(eAmt) || Number.isNaN(uAmt)) return { result: null, calcError: '输入有误' };
      try {
        const r = calculateUpgradeSplit(eAmt, uAmt, 75);
        return { result: r, calcError: null };
      } catch (e: any) {
        return { result: null, calcError: e?.message || '输入有误' };
      }
    }
  }, [mode, total, companyPercent, economy, upgrade]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const formatCurrency = (n: number) => `¥${n.toFixed(2)}`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">航班费用分摊计算</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">计算模式</label>
          <div className="flex space-x-6">
            <label className="inline-flex items-center">
              <input type="radio" className="mr-2" name="mode" value="total" checked={mode === 'total'} onChange={() => setMode('total')} />
              总额分摊
            </label>
            <label className="inline-flex items-center">
              <input type="radio" className="mr-2" name="mode" value="upgrade" checked={mode === 'upgrade'} onChange={() => setMode('upgrade')} />
              经济舱 + 自费升舱
            </label>
          </div>
        </div>

        <div className="space-y-2">
          {mode === 'total' ? (
            <>
              <label className="block text-sm font-medium text-gray-700">航班总费用（元） <span className="text-red-500">*</span></label>
              <input type="number" step="0.01" min="0" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="例如：4500" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">经济舱金额（元）</label>
                <input type="number" step="0.01" min="0" value={economy} onChange={(e) => setEconomy(e.target.value)} placeholder="例如：3000" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">自费升舱金额（元）</label>
                <input type="number" step="0.01" min="0" value={upgrade} onChange={(e) => setUpgrade(e.target.value)} placeholder="例如：1500" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          )}
          {calcError && (
            <p className="text-sm text-red-600">{calcError}</p>
          )}
        </div>

        {mode === 'total' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">公司承担比例</label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="mr-2"
                name="preset"
                value="economy100"
                checked={preset === 'economy100'}
                onChange={() => setPreset('economy100')}
              />
              经济舱公司承担 100%
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="mr-2"
                name="preset"
                value="upgrade75"
                checked={preset === 'upgrade75'}
                onChange={() => setPreset('upgrade75')}
              />
              升舱场景公司承担 75%
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="mr-2"
                name="preset"
                value="custom"
                checked={preset === 'custom'}
                onChange={() => setPreset('custom')}
              />
              自定义比例
            </label>
          </div>

          {preset === 'custom' && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={customPercent}
                  onChange={(e) => setCustomPercent(e.target.value)}
                  className="w-28 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">输入公司承担的百分比（0-100）</p>
            </div>
          )}
        </div>
        )}

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50" disabled={mode === 'total' ? total.trim() === '' : economy.trim() === '' && upgrade.trim() === ''}>计算</button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">计算结果</h3>
        {result ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">公司承担金额</p>
                <p className="text-2xl font-bold text-blue-700">{formatCurrency(result.companyAmount)}</p>
                <p className="text-xs text-blue-600 mt-1">公司承担 {result.companyPercent}%</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <p className="text-sm text-yellow-600 mb-1">个人承担金额</p>
                <p className="text-2xl font-bold text-yellow-700">{formatCurrency(result.employeeAmount)}</p>
                <p className="text-xs text-yellow-600 mt-1">个人承担 {result.employeePercent}%</p>
              </div>
            </div>
            {mode === 'upgrade' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">经济舱金额：</span>
                    <span className="font-medium">{formatCurrency(Number(economy || '0'))}</span>
                    <span className="ml-2 text-gray-500">公司承担 100%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">升舱金额：</span>
                    <span className="font-medium">{formatCurrency(Number(upgrade || '0'))}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">升舱分摊：</span>
                    <span className="font-medium">公司 75% / 个人 25%</span>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">总费用：</span>
                  <span className="font-medium">{formatCurrency(result.totalAmount)}</span>
                </div>
                <div>
                  <span className="text-gray-600">公司承担比例：</span>
                  <span className="font-medium">{result.companyPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">请输入有效的数值以查看结果</div>
        )}
      </div>
    </div>
  );
}
