export interface FlightSplitResult {
  companyAmount: number;
  employeeAmount: number;
  totalAmount: number;
  companyPercent: number;
  employeePercent: number;
}

export function calculateFlightSplit(total: number, companyPercent: number): FlightSplitResult {
  if (!isFinite(total) || !isFinite(companyPercent)) {
    throw new Error('无效输入');
  }
  if (total < 0) {
    throw new Error('总费用不可为负数');
  }
  if (companyPercent < 0 || companyPercent > 100) {
    throw new Error('公司承担比例需在 0-100 之间');
  }

  const companyAmount = round2(total * (companyPercent / 100));
  const employeeAmount = round2(total - companyAmount);

  return {
    companyAmount,
    employeeAmount,
    totalAmount: round2(total),
    companyPercent: round2(companyPercent),
    employeePercent: round2(100 - companyPercent),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function calculateUpgradeSplit(economyAmount: number, upgradeAmount: number, upgradeCompanyPercent: number = 75): FlightSplitResult {
  if (!isFinite(economyAmount) || !isFinite(upgradeAmount) || !isFinite(upgradeCompanyPercent)) {
    throw new Error('无效输入');
  }
  if (economyAmount < 0 || upgradeAmount < 0) {
    throw new Error('金额不可为负数');
  }
  if (upgradeCompanyPercent < 0 || upgradeCompanyPercent > 100) {
    throw new Error('公司承担比例需在 0-100 之间');
  }

  const companyOnUpgrade = round2(upgradeAmount * (upgradeCompanyPercent / 100));
  const companyAmount = round2(economyAmount + companyOnUpgrade);
  const totalAmount = round2(economyAmount + upgradeAmount);
  const employeeAmount = round2(totalAmount - companyAmount);

  const companyPercent = totalAmount === 0 ? 0 : round2((companyAmount / totalAmount) * 100);
  const employeePercent = round2(100 - companyPercent);

  return {
    companyAmount,
    employeeAmount,
    totalAmount,
    companyPercent,
    employeePercent,
  };
}
