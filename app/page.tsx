'use client';

import { useRouter } from "next/navigation";

import { Button, Stack, Typography } from "@mui/material";

export default function Home() {
   const router = useRouter();

  const handleClick = () => {
    router.push('/sign-up');
  };

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gap={4}
      maxWidth={660}
      margin="0 auto"
      textAlign="center"
      position="relative"
    >
      <Typography
        fontSize={38}
        variant="h4"
        fontWeight={600}
      >
        18+
      </Typography>
      
      <Typography
        fontSize={16}
        variant="body2"
        color="rgba(0, 0, 0, 0.65)"
      >
        By continuing, you confirm that you are at least 18 years old and legally permitted to use this service.
      </Typography>

      <Stack
        direction="row"
        gap={2}
        alignItems="center"
      >
        <Button variant="contained" onClick={handleClick}>
          <Typography textTransform="none">I`m over 18 years old</Typography>
        </Button>

        <Button variant="outlined" color="inherit" sx={{ borderColor: '#D9D9D9' }}>
          <Typography textTransform="none">Leave the service</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}
