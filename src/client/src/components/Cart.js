import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  IconButton,
  Badge,
  Popover,
  Typography,
  Box,
  List,
  MenuItem,
} from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { CartProductSmall } from "./CartProduct";

export default function Cart() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <IconButton onClick={() => navigate("/payment")}>
        <Badge color="secondary" badgeContent={4} showZero>
          <LocalMallOutlinedIcon />
        </Badge>
      </IconButton>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        PaperProps={{ sx: { pointerEvents: "auto", width: "400px" } }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableRestoreFocus
      >
        <Typography>4 Items</Typography>
        <List>
          <MenuItem sx={{ p: "5px 0" }}>
            <CartProductSmall />
          </MenuItem>
          <MenuItem sx={{ p: "5px 0" }}>
            <CartProductSmall />
          </MenuItem>
          <MenuItem sx={{ p: "5px 0" }}>
            <CartProductSmall />
          </MenuItem>
        </List>
      </Popover>
    </Box>
  );
}
