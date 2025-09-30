import { Metadata } from 'next';

import { Stack } from '@mui/material';

export const metadata: Metadata = {
  title: "Login"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack
      height="100%"
      margin="0 auto"
      maxWidth="496px"
      width="100%"
      justifyContent="center"
    >
      {children}
    </Stack>
  );
}
