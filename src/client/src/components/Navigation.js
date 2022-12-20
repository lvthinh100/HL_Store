import React from "react";
import { Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";

const NavLinkStyled = styled(Link)((props) => ({
  fontWeight: "bold",
  fontSize: 18,
  textDecoration: "none",
  textTransform: "uppercase",
  color: props.color,
  "&:hover": {
    opacity: 0.6,
  },
}));

export default function Navigation({ theme }) {
  const color = theme === "light" ? "#fff" : "#333";
  return (
    <Stack direction="row" width="60%" justifyContent="space-between">
      <NavLinkStyled color={color} to={"/"}>
        Men
      </NavLinkStyled>
      <NavLinkStyled color={color} to={"/login"}>
        Women
      </NavLinkStyled>
      <NavLinkStyled color={color} to={"/login"}>
        Kid
      </NavLinkStyled>
      <NavLinkStyled color={color} to={"/login"}>
        Coats
      </NavLinkStyled>
      <NavLinkStyled color={color} to={"/"}>
        New Arrivals
      </NavLinkStyled>
    </Stack>
  );
}
