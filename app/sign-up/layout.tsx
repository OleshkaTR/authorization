import { Stack } from '@mui/material'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign Up"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack maxWidth='100%' height="100%">{children}</Stack>
  )
}
