'use client';

import Image from "next/image";

import { Box } from "@mui/material";

import { useMobileMediaQuery } from "../utils/useMobileMediaQuery";

import FirtsStep from "../ui/sign-up/first-step";
import SecondStep from "../ui/sign-up/second-step";
import ThirdStep from "../ui/sign-up/third-step";
import ForthStep from "../ui/sign-up/forth-step";
import StepHeader from "../ui/sign-up/step-header";

import { useStep } from "@/app/utils/useStep";

export default function SignUp() {
  const { step, stepChange } = useStep();
  const isMobile = useMobileMediaQuery();

  return (
    <>
      <Box
        position={isMobile ? 'static' : "absolute"}
        top={64}
        marginY={isMobile ? '16px' : 0}
        display={step === 0 ? 'block' : !isMobile ? 'block' : 'none'}
        textAlign="center" 
        width="100%"
      >
        <Image
          src="/dingtalk.svg"
          alt="logo"
          width={48}
          height={48}
        />
      </Box>

      {step !== 0 && <StepHeader step={step} onStepChange={stepChange} />}

      {step === 0 && <FirtsStep onStepChange={stepChange} />}

      {step === 1 && <SecondStep onStepChange={stepChange} />}

      {step === 2 && <ThirdStep onStepChange={stepChange} />}

      {step === 3 && <ForthStep />}
    </>
  );
}
