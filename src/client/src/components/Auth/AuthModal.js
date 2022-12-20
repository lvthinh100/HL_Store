import React from "react";
import { Modal, Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../redux/slices/appSlice";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TabPanel = function ({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div" sx={{ p: 3, padding: 0 }}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default function AuthModal() {
  const showAuthModal = useSelector((state) => state.app.showAuthModal);
  const [currentTab, setCurrentTab] = useState(0);
  const toSignInTab = () => setCurrentTab(0);
  const toRegisterTab = () => setCurrentTab(1);

  const dispatch = useDispatch();
  const closeAuthModal = function () {
    dispatch(appActions.toggleShowAuthModal());
  };
  return (
    <Modal open={showAuthModal} onClose={closeAuthModal}>
      <Box sx={style}>
        <TabPanel value={currentTab} index={0}>
          <LoginForm onChangeTab={toRegisterTab} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <RegisterForm onChangeTab={toSignInTab} />
        </TabPanel>
      </Box>
    </Modal>
  );
}
