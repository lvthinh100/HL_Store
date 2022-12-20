import { Box, Button, Paper, styled } from "@mui/material";

export const StyledArrBox = styled(Box)({
  height: 420,
  position: "relative",
  margin: "0 auto",
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  "&:hover img": {
    transform: "scale(1.2)",
  },
});

export const StyledArrPaper = styled(Paper)({
  position: "absolute",
  backgroundColor: "#fff",
  width: "100%",
  height: "60px",
  bottom: 20,
  borderRadius: 0,
});

export const StyledButton = styled(Button)({
  boxShadow: 10,
  padding: "15px 50px",
  fontSize: 18,
  marginTop: 2,
});
