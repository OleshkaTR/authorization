'use client';

import FirtsStep from "../ui/sign-up/first-step";
import SecondStep from "../ui/sign-up/second-step";
import ThirdStep from "../ui/sign-up/third-step";
import ForthStep from "../ui/sign-up/forth-step";
import StepHeader from "../ui/sign-up/step-header";

import { useStep } from "@/app/utils/useStep";

export default function SignUp() {
  const { step, stepChange } = useStep();

  return (
    <>
      {step !== 0 && <StepHeader step={step} onStepChange={stepChange} />}

      {step === 0 && <FirtsStep onStepChange={stepChange} />}

      {step === 1 && <SecondStep onStepChange={stepChange} />}

      {step === 2 && <ThirdStep onStepChange={stepChange} />}

      {step === 3 && <ForthStep />}
    </>
  );
}
