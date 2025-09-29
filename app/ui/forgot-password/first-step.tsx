'use client';

import { Button, Stack, Typography } from "@mui/material";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { EmailValidation } from "@/app/utils/validations";
import { Form } from "../form";
import { TextInput } from "../text-input";
import { useState } from "react";
import { StepChangeAction } from "@/app/utils/useStep";

type DefaultValues = {
  email: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
  email: EmailValidation()
});

type Props = {
  onStepChange: (action: StepChangeAction) => void;
}

export default function FirstStep({ onStepChange }: Props) {
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<DefaultValues>({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(schema)
  });

  const submit = (payload: DefaultValues) => {
    const userInfo = localStorage.getItem('user');
    const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

    if (parsedUserInfo.email !== payload.email) {
      return setError('User with this email does not exist!');
    }

    if (parsedUserInfo && parsedUserInfo.email === payload.email) {
      onStepChange('increase');
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Stack gap={2} alignItems="center">
        <Typography variant="h5" fontWeight={600}>Forgot password?</Typography>

        <Typography
          variant="body2" 
          color="rgba(0, 0, 0, 0.65)"
          textAlign="center"
        >
          Provide your account`s email for which you want to restore password!
        </Typography>
      </Stack>

      <Stack gap={1} width="100%">
        <TextInput
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
        />

        {!!error && (
          <Typography color="error" variant="body1" width="100%">{error}</Typography> 
        )}
      </Stack>

      <Button type="submit" fullWidth variant="contained" disabled={!isDirty} sx={{ gap: '8px' }}>
        <Typography variant="body1" textTransform="none">Send code</Typography>
      </Button>
    </Form>
  )
};
