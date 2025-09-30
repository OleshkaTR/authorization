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
      minWidth="496px"
      maxWidth="496px"
      width="496px"
      margin="0 auto"
      height="100%"
      justifyContent="center"
    >
      {children}
    </Stack>
  )
}
