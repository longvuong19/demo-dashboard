import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Input,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/login", { email, password });
      alert("Log in successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Log in failed! Please try again.");
    }
  };

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        padding="16px 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color={theme.palette.secondary.main}
        >
          VISIONARY
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "35%" : "93%"}
        padding="32px"
        margin="80px auto"
        borderRadius="24px"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          textAlign="center"
          fontWeight="600"
          variant="h5"
          sx={{ marginBottom: "24px" }}
          color={theme.palette.secondary.main}
        >
          Welcome to VISIONARY!
        </Typography>
        <form onSubmit={handleLoginSubmit}>
          <Box marginBottom="40px">
            <Box m="32px 0">
              <Input
                fullWidth
                type="text"
                value={email}
                placeholder="Your Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box m="32px 0">
              <Input
                fullWidth
                type="password"
                value={password}
                placeholder="Your Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Box>

          <Button
            fullWidth
            type="submit"
            sx={{
              padding: "16px",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            Log In
          </Button>
          <Box display="flex" justifyContent="center" marginTop="32px">
            <Typography>
              Don't have an account?{" "}
              <Link
                to={"/register"}
                style={{
                  textDecoration: "none",
                  color: "#ffda85",
                }}
              >
                {" "}
                Register now!
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
