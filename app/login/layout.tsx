import { Stack } from '@mui/material';
import { Metadata } from 'next';

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
      minWidth="496px"
      maxWidth="496px"
      width="496px"
      justifyContent="center"
    >
      {children}
    </Stack>
  )
}
