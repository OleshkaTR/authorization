import { Metadata } from 'next';

import { Stack } from '@mui/material';

export const metadata: Metadata = {
  title: "Sign Up"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack
      height="100%"
      minWidth="496px"
      maxWidth="496px"
      width="496px"
      margin="0 auto"
      justifyContent="center"
      position="relative"
    >
      {children}
    </Stack>
  )
}
