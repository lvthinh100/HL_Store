import { Box, styled } from "@mui/material";

export const BoxModalStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}));
