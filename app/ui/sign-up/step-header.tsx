import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { StepChangeAction } from "@/app/utils/useStep";

const percentageByStep = [0, 33.33, 66.66, 100];

type Props = {
  step: number;
  onStepChange: (action: StepChangeAction) => void;
};

export default function StepHeader({ step, onStepChange }: Props) {
  const goToPreviousStep = () => {
    onStepChange('decrease');
  };

  return (
    <Stack
      gap={2}
      width="100%"          
      alignItems="start"
      position="absolute"
      top={160}
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
          value={percentageByStep[step]}
          sx={{
            "&.MuiLinearProgress-root": {
              backgroundColor: "#D1D1D1"
            }
          }}
        />
      </Box>
    </Stack>
  );
}
