import { styled } from "@mui/material";

export const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  alignItems: 'center',
  gap: 32,

  [theme.breakpoints.down("md")]: {
    background: "#fff",
    height: '100%',
    justifyContent: 'space-between',
    padding: '0 16px 64px'
  },

  [theme.breakpoints.up("md")]: {
    padding: 48,
    background: "#F9F9F9",
    boxShadow: "0px 2px 8px 0px #0000001F",
    borderRadius: 16,
    justifyContent: 'center'
  }
}));
