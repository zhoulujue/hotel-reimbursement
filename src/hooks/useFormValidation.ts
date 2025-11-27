import { useState, useCallback } from 'react';
import { InputData } from '../types';

// 表单验证Hook
export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateInput = useCallback((input: Partial<InputData>): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!input.standardPerNight || input.standardPerNight <= 0) {
      newErrors.standardPerNight = '请输入有效的每晚住宿标准';
    }
    
    if (!input.nights || input.nights <= 0) {
      newErrors.nights = '请输入有效的住宿天数';
    }
    
    if (input.inputMode === 'total' && (!input.totalAmount || input.totalAmount < 0)) {
      newErrors.totalAmount = '请输入有效的预订总价';
    }
    
    if (input.inputMode === 'pernight' && (!input.pricePerNight || input.pricePerNight < 0)) {
      newErrors.pricePerNight = '请输入有效的每晚房价';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);
  
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);
  
  return { errors, validateInput, clearErrors };
}