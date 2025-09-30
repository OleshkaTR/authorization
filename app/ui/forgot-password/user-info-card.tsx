import { Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  isSelected: boolean;
  icon: ReactElement;
  info: string;
  onClick: () => void;
};

export default function UserInfoCard({ isSelected, icon, info, onClick }: Props) {
  return (
    <Stack
      direction='row'
      gap={3}
      alignItems="center"
      padding={3}
      bgcolor={isSelected ? "#1677FF" : "#FFFFFF"}
      boxShadow="0px 2px 12px 1px #91909029"
      onClick={onClick}
      sx={{
        cursor: 'pointer'
      }}
    >
      {icon}

      <Stack gap={0.5}>
        <Typography
          variant="body2"
          color="rgba(0, 0, 0, 0.65)"
        >
          via mail:
        </Typography>

        
        <Typography
          variant="body2"
          color="rgba(0, 0, 0, 0.65)"
          fontWeight={600}
        >
          {info}
        </Typography>
      </Stack>
    </Stack>
  );
}
