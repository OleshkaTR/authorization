'use client';

import FirtsStep from "../ui/forgot-password/first-step";
import SecondStep from "../ui/forgot-password/second-step";
import { useStep } from "../utils/useStep";
import ThirdStep from "../ui/forgot-password/third-step";

export default function ForgotPassword() {
  const { step, stepChange } = useStep();

  return (
    <>
      {step === 0 && <FirtsStep onStepChange={stepChange} />}

      {step === 1 && <SecondStep onStepChange={stepChange} />}

      {step === 2 && <ThirdStep />}
    </>
  );
}
