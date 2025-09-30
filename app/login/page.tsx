'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Stack, styled, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { TextInput } from "../ui/text-input";
import { Form } from "../ui/form";
import { PasswordInput } from "../ui/password-input";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AuthSliceActions } from "../store/auth/slice";
import { UsersSelectors } from "../store/users/slice";

const StyledLink = styled(Link)({
  color: "#000000",
  textDecoration: 'none',
  fontSize: '14px',
  width: 'fit-content'
});

type DefaultValues = {
  emailOrPhone: string;
  password: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
  emailOrPhone: yup.string().trim().required('Field is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(12, 'Password must be at least 12 characters')
    .max(40, 'Password maximum 40 characters')
});

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const users = useAppSelector(UsersSelectors.getUsers);

  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<DefaultValues>({
    defaultValues: {
      emailOrPhone: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const submit = (payload: DefaultValues) => {
    const user = users.find((user) => user.email === payload.emailOrPhone || user.phone === payload.emailOrPhone);

    if (!user) {
      return setError('User does not exist!')
    }

    if (user.password === payload.password) {
      dispatch(AuthSliceActions.login());
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Stack height='100%' justifyContent='center' width="100%" gap={4}>
        <Typography variant="h5" fontWeight={600} textAlign="center">Welcome back!</Typography>

        <Stack
          gap={2}
          width="100%"
        >
          <TextInput
            control={control}
            name="emailOrPhone"
            label="Email/Phone"
            placeholder="Email/Phone"
          />
          
          <PasswordInput
            control={control}
            name="password"
            label="Password"
            placeholder="Password"
          />

          {!!error && (
            <Typography color="error" variant="body1">{error}</Typography> 
          )}

          <StyledLink
            href="/forgot-password"
          >
            Forgot Password?
          </StyledLink>
        </Stack>
      </Stack>

      <Button type="submit" fullWidth variant="contained" disabled={!isDirty} sx={{ gap: '8px' }}>
        <Typography variant="body1" textTransform="none">Log In</Typography>

        <ArrowForwardIcon sx={{ color: !isDirty ? '' : '#FFFFFF', fontSize: '18px' }} />
      </Button>
    </Form>
  )
};
