import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Stack } from "@mui/material";

import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome back"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreProvider>
          <ThemeProvider>
            <Stack
              height="100vh"
              margin="0 auto"
            >
              {children}
            </Stack>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
