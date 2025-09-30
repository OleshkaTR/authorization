'use client';

import { useEffect, useState, useRef, type KeyboardEvent, ChangeEvent } from "react";
import Image from "next/image";

import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Form } from "../form";
import UserInfoCard from "./user-info-card";

import { StepChangeAction } from "@/app/utils/useStep";

import { useAppSelector } from "@/app/store/hooks";
import { ForgotPasswordSelectors } from "@/app/store/forgot-password/slice";

type ViaType = 'phone' | 'email';

type Props = {
  onStepChange: (action: StepChangeAction) => void;
}

export default function SecondStep({ onStepChange }: Props) {
  const [type, setType] = useState<ViaType>('email');
  const [step, setStep] = useState(0);
  const userInfo = useAppSelector(ForgotPasswordSelectors.getState);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        onStepChange('increase');
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const goToNextStep = () => {
    setStep(1);
  };

  const goBack = () => {
    onStepChange('decrease');
  };

  const chooseType = (via: ViaType) => {
    if (type === via) return;

    setType(via);
  }

  useEffect(() => {
    if (inputRefs.current.length === 6) {
      onStepChange('increase');
    } 
  }, [onStepChange]);

  return (
    <Form>
      {step === 0 ? (
        <>
          <Stack gap={2} alignItems="center">
            <Typography variant="h5" fontWeight={600}>Make selection</Typography>

            <Typography
              variant="body2" 
              color="rgba(0, 0, 0, 0.65)"
              textAlign="center"
            >
              Select which contact detail should we use to reset your password.
            </Typography>
          </Stack>

          <Stack gap={2} width="100%">
            <UserInfoCard
              icon={<MailOutlineIcon sx={{ fontSize: '36px' }} color="action" />}
              info={userInfo.email}
              isSelected={type === 'email'}
              onClick={() => chooseType('email')}
            />

            <UserInfoCard
              icon={<Image width={36} height={36} alt="phone" src="/mobile.svg" />}
              info={userInfo.phone}
              isSelected={type === 'phone'}
              onClick={() => chooseType('phone')}
            />
          </Stack>

          <Stack gap={2} width="100%">
            <Button onClick={goToNextStep} fullWidth variant="contained" sx={{ gap: '8px' }}>
              <Typography variant="body1" textTransform="none">Next</Typography>

              <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: '18px' }} />
            </Button>

            <Button onClick={goBack} fullWidth variant="outlined" sx={{ border: 0, color: 'rgba(0, 0, 0, 0.48)' }}>
              <Typography variant="body1" textTransform="none">Cancel</Typography>
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Stack gap={2} alignItems="center">
            <Typography variant="h5" fontWeight={600}>Make selection</Typography>

            <Typography
              variant="body2" 
              color="rgba(0, 0, 0, 0.65)"
              textAlign="center"
            >
              The recovery code was sent to {type === 'email' ? 'email' : 'phone'}. Please enter the code.{' '}
              <Typography
                variant="caption"
                color="#000000"
                fontSize={14}
                onClick={goBack}
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Change email address
              </Typography>
            </Typography>
          </Stack>

          <Box display="flex" gap={1}>
            {Array.from({ length: 6 }).map((_, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                size="small"
                inputProps={{
                  maxLength: 1,
                  sx: {
                    textAlign: "center",
                    fontSize: "14px",
                    width: "40px",
                    height: "40px",
                    padding: 0
                  },
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </Box>
        </>
      )}
    </Form>
  );
};
