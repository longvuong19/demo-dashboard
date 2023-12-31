import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
  Menu,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/");
  };

  // console.log(user);
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="8px"
            gap="48px"
            padding="4px 24px"
            marginLeft="12px"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right */}
        <FlexBetween gap="24px">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "24px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "24px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "24px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "16px",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="16px"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="14px"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "24px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrgin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
