"use client"

import { Button as MuiButton, styled } from "@mui/material";

export const CommonButton = styled(MuiButton)<{ size?: 'medium' | 'large' }>(({ size }) => ({
  height: size === 'large' ? '46px' : '40px'
}));
