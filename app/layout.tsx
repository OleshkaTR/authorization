'use client';

import Image from "next/image";
import { Inter } from "next/font/google";

import { Box } from "@mui/material";

import { useMobileMediaQuery } from "./utils/useMobileMediaQuery";

import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";
import { usePathname } from "next/navigation";

import './global.css';

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMobileMediaQuery();
  const pathName = usePathname();

  const isLogoHidden = pathName === '/sign-up';

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <ThemeProvider>
            <Box
              height="100%"
              margin="0 auto"
              position="relative"
              overflow="auto"
              display="flex"
              flexDirection="column"
            >
              <Box
                position={isMobile ? 'static' : "absolute"}
                top={64}
                marginY={isMobile ? '16px' : 0}
                display={isLogoHidden ? 'none' : 'block'} 
                textAlign="center" 
                width="100%"
              >
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
