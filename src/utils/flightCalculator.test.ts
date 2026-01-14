import { describe, it, expect } from 'vitest';
import { calculateFlightSplit, calculateUpgradeSplit } from './flightCalculator';

describe('flightCalculator', () => {
  it('calculates 75% company share correctly', () => {
    const r = calculateFlightSplit(6000, 75);
    expect(r.companyAmount).toBe(4500);
    expect(r.employeeAmount).toBe(1500);
    expect(r.totalAmount).toBe(6000);
  });

  it('calculates 100% company share correctly', () => {
    const r = calculateFlightSplit(3000, 100);
    expect(r.companyAmount).toBe(3000);
    expect(r.employeeAmount).toBe(0);
  });

  it('rejects negative totals', () => {
    expect(() => calculateFlightSplit(-1, 75)).toThrow();
  });

  it('rejects out of range percent', () => {
    expect(() => calculateFlightSplit(100, 120)).toThrow();
  });

  it('upgrade scenario 3000 + 1500 at 75% company share', () => {
    const r = calculateUpgradeSplit(3000, 1500, 75);
    expect(r.companyAmount).toBe(4125);
    expect(r.employeeAmount).toBe(375);
    expect(r.totalAmount).toBe(4500);
    expect(Math.round(r.companyPercent)).toBe(92);
  });
});
