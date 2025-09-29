'use client';

import FirtsStep from "../ui/forgot-password/first-step";
import SecondStep from "../ui/forgot-password/second-step";
import { Stack } from "@mui/material";
import { useStep } from "../utils/useStep";
import ThirdStep from "../ui/forgot-password/third-step";

export default function ForgotPassword() {
  const { step, stepChange } = useStep();

  return (
    <Stack
      minWidth="496px"
      maxWidth="496px"
      width="496px"
      margin="0 auto"
      height="100%"
      justifyContent="center"
    >
      {step === 0 && <FirtsStep onStepChange={stepChange} />}

      {step === 1 && <SecondStep onStepChange={stepChange} />}

      {step === 2 && <ThirdStep />}
    </Stack>
  );
}
