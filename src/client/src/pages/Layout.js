import { Container } from "@mui/system";
import React, { Fragment } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import AuthModal from "../components/Auth/AuthModal.js";
import Notification from "../components/Notification.js";
import HideOnScroll from "../components/HideOnScroll.js";
//redux
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { NAVBAR } from "../config.js";

export default function Layout(props) {
  const { children } = props;
  const user = useSelector((state) => state.auth.user);

  return (
    <Fragment>
      <HideOnScroll {...props}>
        <Box>
          <Navbar />
        </Box>
      </HideOnScroll>
      <Box marginTop={NAVBAR.HEIGHT + "px"}>
        {!user && <AuthModal />}
        <Notification />
        {children}
      </Box>
      <Footer />
    </Fragment>
  );
}
