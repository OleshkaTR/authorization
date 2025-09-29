'use client'

import { createTheme } from "@mui/material/styles";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
  )
}
