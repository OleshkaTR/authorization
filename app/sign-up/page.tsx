'use client';

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SignUpActions, SignUpSelectors } from "../store/sign-up/slice";

import FirtsStep from "../ui/sign-up/first-step";
import SecondStep from "../ui/sign-up/second-step";
import ThirdStep from "../ui/sign-up/third-step";
import ForthStep from "../ui/sign-up/forth-step";
import { Stack } from "@mui/material";

export type StepChangeAction = 'increase' | 'decrease';

export default function SignUp() {
  const step = useAppSelector(SignUpSelectors.getStep);
  const dispatch = useAppDispatch();

  const handleStepChange = useCallback((action: StepChangeAction) => {
    const nextStep = action === 'increase' ? step + 1 : step - 1;
    dispatch(SignUpActions.setStep(nextStep));
  }, [dispatch, step]);

  return (
    <Stack
      minWidth="496px"
      maxWidth="496px"
      width="496px"
      margin="0 auto"
    >
      {step === 0 && <FirtsStep onStepChange={handleStepChange} />}

      {step === 1 && <SecondStep onStepChange={handleStepChange} />}

      {step === 2 && <ThirdStep onStepChange={handleStepChange} />}

      {step === 3 && <ForthStep onStepChange={handleStepChange} />}
    </Stack>
  );
}
