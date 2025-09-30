'use client';

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack, Typography, Button} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SignUpActions, SignUpSelectors } from "@/app/store/sign-up/slice";

import { StepChangeAction } from "@/app/utils/useStep";

import { TextInput } from "../text-input";
import { Form } from "../form";
import CountrySelect from "../country-select";

type DefaultValues = {
  country: string;
  city: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
  country: yup.string().trim().required('Country is required'),
  city: yup.string().trim().required('City is required')
});

type Props = {
  onStepChange: (action: StepChangeAction) => void;
}

export default function SecondStep({ onStepChange }: Props) {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(SignUpSelectors.getUserInfo);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty }
  } = useForm<DefaultValues>({
    defaultValues: {
      country: '',
      city:  ''
    },
    resolver: yupResolver(schema)
  });

   useEffect(() => {
    if (userInfo.country || userInfo.city) {
      setValue('country', userInfo.country, { shouldDirty: true });
      setValue('city', userInfo.city, { shouldDirty: true });
    }
  }, [userInfo.country, userInfo.city, setValue]);

  const submit = (payload: DefaultValues) => {
    dispatch(SignUpActions.setUserInfo(payload));
    onStepChange('increase');
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Stack height='100%' justifyContent='center' width="100%" gap={4}>
        <Typography variant="h5" fontWeight={600} textAlign="center">Where do you live?</Typography>

        <Stack
          gap={2}
          width="100%"
        >
          <CountrySelect
            control={control}
            name="country"
          />
          
          <Stack gap={0.5}>
            <Typography fontSize={14} fontWeight={600}>City</Typography>

            <TextInput
              control={control}
              name="city"
              label=""
              placeholder="City"
            />
          </Stack>
        </Stack>
      </Stack>

      <Button type="submit" fullWidth variant="contained" disabled={!isDirty} sx={{ gap: '8px' }}>
        <Typography variant="body1" textTransform="none">Continue</Typography>

        <ArrowForwardIcon sx={{ color: !isDirty ? '' : '#FFFFFF', fontSize: '18px' }} />
      </Button>
    </Form>
  );
}
