import { Metadata } from 'next';

import { Stack } from '@mui/material';

export const metadata: Metadata = {
  title: "Forgot Password"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack
      maxWidth="496px"
      width="100%"
      margin="0 auto"
      height="100%"
      justifyContent="center"
    >
      {children}
    </Stack>
  )
}
