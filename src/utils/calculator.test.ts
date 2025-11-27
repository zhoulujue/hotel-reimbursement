import { describe, it, expect } from 'vitest';
import { HotelReimbursementCalculator } from './calculator';

describe('HotelReimbursementCalculator', () => {
  const calc = new HotelReimbursementCalculator();

  it('computes company fully covers within standard', () => {
    const result = calc.calculate({
      standardPerNight: 200,
      nights: 2,
      inputMode: 'total',
      totalAmount: 400,
      hasSpecialApproval: false,
      currency: 'CNY',
    });
    expect(result.companyAmount).toBe(400);
    expect(result.employeeAmount).toBe(0);
    expect(result.approved).toBe(false);
  });

  it('applies tiered ratios above standard', () => {
    const result = calc.calculate({
      standardPerNight: 200,
      nights: 2,
      inputMode: 'total',
      totalAmount: 800,
      hasSpecialApproval: false,
      currency: 'CNY',
    });
    expect(result.totalAmount).toBe(800);
    expect(result.standardAmount).toBe(400);
    const company = result.companyAmount;
    const employee = result.employeeAmount;
    expect(company + employee).toBeCloseTo(800);
  });

  it('special approval covers all', () => {
    const result = calc.calculate({
      standardPerNight: 300,
      nights: 3,
      inputMode: 'pernight',
      pricePerNight: 500,
      hasSpecialApproval: true,
      currency: 'USD',
    });
    expect(result.approved).toBe(true);
    expect(result.companyAmount).toBe(result.totalAmount);
    expect(result.employeeAmount).toBe(0);
  });

  it('validates inputs and throws on invalid values', () => {
    expect(() => calc.calculate({
      standardPerNight: 0,
      nights: 1,
      inputMode: 'total',
      totalAmount: 100,
      hasSpecialApproval: false,
      currency: 'CNY',
    } as any)).toThrow();

    expect(() => calc.calculate({
      standardPerNight: 100,
      nights: 0,
      inputMode: 'pernight',
      pricePerNight: 100,
      hasSpecialApproval: false,
      currency: 'CNY',
    } as any)).toThrow();
  });
});
