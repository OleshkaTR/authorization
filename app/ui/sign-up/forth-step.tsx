'use client';

import { useForm, useWatch } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Chip, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SignUpActions, SignUpSelectors } from "@/app/store/sign-up/slice";

import { Form } from "../form";
import { useRouter } from "next/navigation";
import { UsersActions } from "@/app/store/users/slice";

type DefaultValues = {
  goal: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
  goal: yup.string().trim().defined()
});

const goals = ["Friends first", "Casual dating", "Serious relationships", "Activity partner"];

export default function ForthStep() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(SignUpSelectors.getUserInfo);
  const router = useRouter();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isDirty }
  } = useForm<DefaultValues>({
    defaultValues: {
      goal: ''
    },
    resolver: yupResolver(schema)
  });

  const selectedGoal = useWatch({ control, name: 'goal' });

  const submit = (payload: DefaultValues) => {
    dispatch(SignUpActions.setUserInfo(payload));
    dispatch(UsersActions.createUser({ ...userInfo, goal: payload.goal }));
    router.push('/login');
  };

  const handleClick = (value: string) => {
    if (selectedGoal !== value) {
      setValue('goal', value, { shouldDirty: true });
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Typography variant="h5" fontWeight={600}>What are you looking for?</Typography>

      <Stack
        direction="row"
        gap={1}
        flexWrap="wrap"
      >
        {goals.map((goal) => (
          <Chip
            key={goal}
            label={goal}
            onClick={() => handleClick(goal)}
            sx={{
              borderRadius: '8px',
              fontSize: '16px',
              height: '46px',
              background: selectedGoal === goal ? '#1677FF' : '#FFFFFF',
              color: selectedGoal === goal ? '#FFFFFF' : '#000000',
              '.MuiChip-label': {
                padding: '8px 16px'
              }
            }}
          />
        ))}
      </Stack>

      <Button type="submit" fullWidth variant="contained" disabled={!isDirty} sx={{ gap: '8px' }}>
        <Typography variant="body1" textTransform="none">Continue</Typography>

        <ArrowForwardIcon sx={{ color: !isDirty ? '' : '#FFFFFF', fontSize: '18px' }} />
      </Button>
    </Form>
  );
}
