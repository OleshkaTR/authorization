'use client';

import { Button, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form } from "../form";
import { PasswordInput } from "../password-input";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { UsersActions, UsersSelectors } from "@/app/store/users/slice";
import { ForgotPasswordSelectors } from "@/app/store/forgot-password/slice";

type DefaultValues = {
  newPassword: string;
  confirmPassword: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(12, 'Password must be at least 12 characters')
    .max(40, 'Password maximum 40 characters'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .min(12, 'Password must be at least 12 characters')
    .max(40, 'Password maximum 40 characters')
    .oneOf([yup.ref("newPassword")], "Passwords must match")
});

export default function ThirdStep() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const users = useAppSelector(UsersSelectors.getUsers);
  const { email } = useAppSelector(ForgotPasswordSelectors.getState);

  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<DefaultValues>({
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  });

  const submit = (payload: DefaultValues) => {
    const user = users.find((user) => user.email === email);

    if (user) {
      const filterdUsers = users.filter((user) => user.email !== email);
      dispatch(UsersActions.setUsers([...filterdUsers, { ...user, password: payload.newPassword }]))
      router.push('/login');
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Typography variant="h5" fontWeight={600}>Enter new password</Typography>

      <Stack
        gap={2}
        width="100%"
      >
        <PasswordInput
          control={control}
          name="newPassword"
          label="New Password"
          placeholder="New Password"
        />
        
        <PasswordInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
        />
      </Stack>

      <Button type="submit" fullWidth variant="contained" disabled={!isDirty} sx={{ gap: '8px' }}>
        <Typography variant="body1" textTransform="none">Save</Typography>

        <ArrowForwardIcon sx={{ color: !isDirty ? '' : '#FFFFFF', fontSize: '18px' }} />
      </Button>
    </Form>
  )
};
