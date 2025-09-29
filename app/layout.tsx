import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Box } from "@mui/material";

import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";
import Image from "next/image";

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
            <Box
              height="100vh"
              margin="0 auto"
              position="relative"
            >
              <Box position="absolute" top={64} textAlign="center" width="100%">
                <Image
                  src="/dingtalk.svg"
                  alt="logo"
                  width={48}
                  height={48}
                />
              </Box>

              {children}
            </Box>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
