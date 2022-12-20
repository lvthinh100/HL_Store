import { styled, Link } from "@mui/material";

export const TabLink = styled(Link)(() => ({
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
  },
}));
