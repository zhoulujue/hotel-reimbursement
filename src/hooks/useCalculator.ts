import { useState, useCallback, useMemo } from 'react';
import { HotelReimbursementCalculator } from '../utils/calculator';
import { InputData, CalculatorState } from '../types';

// 计算器逻辑Hook
export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    inputData: null,
    result: null,
    isCalculating: false,
    error: null
  });

  const calculator = useMemo(() => new HotelReimbursementCalculator(), []);
  
  const calculate = useCallback(async (input: InputData) => {
    setState(prev => ({ ...prev, isCalculating: true, error: null }));
    
    try {
      const result = calculator.calculate(input);
      setState({ inputData: input, result, isCalculating: false, error: null });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isCalculating: false, 
        error: error instanceof Error ? error.message : '计算失败'
      }));
    }
  }, [calculator]);
  
  const clear = useCallback(() => {
    setState({
      inputData: null,
      result: null,
      isCalculating: false,
      error: null
    });
  }, []);
  
  return { state, calculate, clear };
}