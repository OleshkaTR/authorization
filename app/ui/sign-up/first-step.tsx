'use client';

import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SignUpActions, SignUpSelectors } from "@/app/store/sign-up/slice";

import { EmailValidation, PhoneNumberValidation } from "../../utils/validations";

import { CommonButton } from "../common-button";
import { TextInput } from "../text-input";
import { PasswordInput } from "../password-input";
import CheckboxInput from "../checkbox-Input";
import { Form } from "../form";
import { StepChangeAction } from "@/app/sign-up/page";

import Image from "next/image";
import { useEffect } from "react";

type DefaultValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirm: boolean;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
  fullName: yup.string().trim().required('Field is required'),
  email: EmailValidation(),
  phone: PhoneNumberValidation(),
  password: yup
    .string()
    .required('Password is required')
    .min(12, 'Password must be at least 12 characters')
    .max(40, 'Password maximum 40 characters'),
  confirm: yup.boolean().oneOf([true], 'Confirm please').required('Field is required')
});

type Props = {
  onStepChange: (action: StepChangeAction) => void;
}

export default function FirtsStep({ onStepChange }: Props) {
  const userInfo = useAppSelector(SignUpSelectors.getUserInfo);
  const dispatch = useAppDispatch();

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isDirty }
  } = useForm<DefaultValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirm: true
    },
    resolver: yupResolver(schema)
  });

  const submit = (payload: DefaultValues) => {
    dispatch(SignUpActions.setUserInfo(payload));
    onStepChange('increase');
  };

  useEffect(() => {
    if (userInfo.fullName || userInfo.email || userInfo.phone || userInfo.password) {
      reset({
        fullName: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phone,
        password: userInfo.password
      }, { keepDirty: true });
    }
  }, [userInfo.fullName, userInfo.email, userInfo.phone, userInfo.password, reset]);

  return (
    <Stack
      alignItems="center"
      gap="174px"
      paddingTop={8}
    >
      <Image
        src="/dingtalk.svg"
        alt="logo"
        width={48}
        height={48}
      />

      <Form onSubmit={handleSubmit(submit)}>
        <Typography variant="h5" fontWeight={600}>Registration</Typography>

        <Stack
          gap={2}
          width="100%"
        >
          <Stack gap={2}>
            <TextInput
              control={control}
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
            />
            
            <TextInput
              control={control}
              name="email"
              label="Email"
              placeholder="Email"
            />
            
            <TextInput
              control={control}
              name="phone"
              label="Phone"
              placeholder="Phone"
            />
            
            <PasswordInput
              control={control}
              name="password"
              label="Password"
              placeholder="Password"
            />
          </Stack>

          <CheckboxInput
            name="confirm"
            control={control}
            label={
              <Typography variant="body1" fontSize={14} marginTop={1}>By continuing, you agree to our{' '}
                <Typography component="span" variant="body1" sx={{ textDecoration: 'underline', fontSize: 'inherit' }}>Terms of Use</Typography>
                {' '}and{' '}
                <Typography component="span" variant="body1" sx={{ textDecoration: 'underline', fontSize: 'inherit' }}>Privacy Policy</Typography>
              </Typography>
            }
          />
        </Stack>

        <CommonButton type="submit" fullWidth variant="contained" disabled={!isDirty} sx={{ gap: '8px' }}>
          <Typography variant="body1" textTransform="none">Continue</Typography>

          <ArrowForwardIcon sx={{ color: !isDirty ? '' : '#FFFFFF', fontSize: '18px' }} />
        </CommonButton>
      </Form>
    </Stack>
  );
}
