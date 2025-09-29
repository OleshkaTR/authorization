'use client';

import FirtsStep from "../ui/sign-up/first-step";
import SecondStep from "../ui/sign-up/second-step";
import ThirdStep from "../ui/sign-up/third-step";
import ForthStep from "../ui/sign-up/forth-step";
import { Stack } from "@mui/material";
import { useStep } from "@/app/utils/useStep";
import StepHeader from "../ui/sign-up/step-header";

export default function SignUp() {
  const { step, stepChange } = useStep();

  return (
    <Stack
      height="100%"
      minWidth="496px"
      maxWidth="496px"
      width="496px"
      margin="0 auto"
      justifyContent="center"
      position="relative"
    >
      {step !== 0 && <StepHeader step={step} onStepChange={stepChange} />}

      {step === 0 && <FirtsStep onStepChange={stepChange} />}

      {step === 1 && <SecondStep onStepChange={stepChange} />}

      {step === 2 && <ThirdStep onStepChange={stepChange} />}

      {step === 3 && <ForthStep />}
    </Stack>
  );
}
