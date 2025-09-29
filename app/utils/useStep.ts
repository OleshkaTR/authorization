import { useCallback, useState } from "react";

export type StepChangeAction = 'increase' | 'decrease';

export const useStep = () => {
  const [step, setStep] = useState(0);

  const stepChange = useCallback((action: StepChangeAction) => {
    const nextStep = action === 'increase' ? step + 1 : step - 1;
    setStep(nextStep);
  }, [step]);

  return { step, stepChange };
};
