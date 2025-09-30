import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { StepChangeAction } from "@/app/utils/useStep";
import { useMobileMediaQuery } from "@/app/utils/useMobileMediaQuery";


const percentageByStep = [0, 33.33, 66.66, 100];

type Props = {
  step: number;
  onStepChange: (action: StepChangeAction) => void;
};

export default function StepHeader({ step, onStepChange }: Props) {
  const isMobile = useMobileMediaQuery();

  const goToPreviousStep = () => {
    onStepChange('decrease');
  };

  return (
    <Stack
      gap={2}
      width={isMobile ? 'auto' : '100%'}
      alignItems="start"
      position={isMobile ? 'static' : "absolute"}
      marginY={isMobile ? '32px' : 0}
      paddingX={isMobile ? '16px' : 0}
      top={160}
    >
      <Button
        variant="text"
        sx={{
          gap: '8px',
          color: '#000000',
          width: 'auto',
          minWidth: 'fit-content'
        }}
        onClick={goToPreviousStep}
      >
        {isMobile ? <ArrowBackIosNewIcon sx={{ fontSize:"24px" }} /> : <ArrowBackIcon sx={{ fontSize:"18px" }} /> }

        {!isMobile && <Typography variant="body1">Back</Typography>}
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
