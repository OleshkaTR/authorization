'use client';

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {  Button, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SignUpActions, SignUpSelectors } from "@/app/store/sign-up/slice";

import { StepChangeAction } from "@/app/utils/useStep";

import { TextInput } from "../text-input";
import { Form } from "../form";
import CustomDatePicker from "../date-picker";

type DefaultValues = {
  dateOfBirth: string;
  biography: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
  dateOfBirth: yup.string().trim().required('Day of birth is required'),
  biography: yup.string().trim().defined()
});

type Props = {
  onStepChange: (action: StepChangeAction) => void;
};

export default function ThirdStep({ onStepChange }: Props) {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(SignUpSelectors.getUserInfo);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty }
  } = useForm<DefaultValues>({
    defaultValues: {
      dateOfBirth: '',
      biography: ''
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (userInfo.dateOfBirth || userInfo.biography) {
      setValue('dateOfBirth', userInfo.dateOfBirth, { shouldDirty: true });
      setValue('biography', userInfo.biography, { shouldDirty: true });
    }
  }, [userInfo.dateOfBirth, userInfo.biography, setValue]);

  const submit = (payload: DefaultValues) => {
    console.debug('payload', payload)
    dispatch(SignUpActions.setUserInfo(payload));
    onStepChange('increase');
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Typography variant="h5" fontWeight={600}>Tell us about yourself</Typography>

      <Stack
        gap={2}
        width="100%"
      >
        <Stack gap={0.5}>
          <Typography fontSize={14} fontWeight={600}>Date of birth</Typography>
        
          <CustomDatePicker
            control={control}
            name="dateOfBirth"
          />
        </Stack>
        
        <Stack gap={0.5}>
          <Typography fontSize={14} fontWeight={600}>Biography</Typography>

          <TextInput
            control={control}
            name="biography"
            label=""
            placeholder="Enter"
            multiline
            maxRows={8}
            minRows={16}
          />
        </Stack>
      </Stack>

      <Button type="submit" fullWidth variant="contained" disabled={!isDirty} sx={{ gap: '8px' }}>
        <Typography variant="body1" textTransform="none">Continue</Typography>

        <ArrowForwardIcon sx={{ color: !isDirty ? '' : '#FFFFFF', fontSize: '18px' }} />
      </Button>
    </Form>
  );
}
