import Image from "next/image";

import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { StepChangeAction } from "@/app/sign-up/page";

type Props = {
  onStepChange: (action: StepChangeAction) => void;
  percentage: number;
};

export default function StepHeader({ onStepChange, percentage }: Props) {
  const goToPreviousStep = () => {
    onStepChange('decrease');
  };

  return (
      <Stack
        gap={6}
        width="100%"
        alignItems="center"
      >
        <Image
          src="/dingtalk.svg"
          alt="logo"
          width={48}
          height={48}
        />

        <Stack
          gap={2}
          width="100%"          
          alignItems="start"
        >
          <Button
            variant="text"
            sx={{
              gap: '8px',
              color: '#000000',
              width: 'auto'
            }}
            onClick={goToPreviousStep}
          >
            <ArrowBackIcon sx={{ fontSize:"18px" }} /> 

            <Typography variant="body1">Back</Typography>
          </Button>

          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                "&.MuiLinearProgress-root": {
                  backgroundColor: "#D1D1D1"
                }
              }}
            />
          </Box>
        </Stack>
      </Stack>
  );
}
