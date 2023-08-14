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

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const countriesData = [
    "ID",
    "CN",
    "TH",
    "AR",
    "PL",
    "BR",
    "SI",
    "PH",
    "JO",
    "GR",
    "RU",
    "VN",
    "FR",
    "CA",
    "CL",
    "SV",
    "SE",
    "PE",
    "BA",
    "RS",
    "UA",
    "UG",
    "NG",
    "HN",
    "CM",
    "AF",
    "US",
    "PY",
    "JM",
    "NA",
    "EC",
    "KM",
    "BD",
    "ES",
    "PS",
    "CZ",
    "KR",
    "DO",
    "NI",
    "JP",
    "GB",
    "LS",
    "NZ",
  ];

  const register = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/register", {
        name,
        occupation,
        email,
        password,
        country,
        phoneNumber,
      });
      alert("Register successfully! Now you can log in!");
      navigate("/");
    } catch (error) {
      alert("Register failed! Please try again.");
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
          fontWeight="600"
          variant="h5"
          sx={{ marginBottom: "24px" }}
          color={theme.palette.secondary.main}
          textAlign="center"
        >
          Welcome to VISIONARY!
        </Typography>
        <form onSubmit={register}>
          <Box marginBottom="40px">
            <Box display="flex" justifyContent="space-around">
              <Input
                type="text"
                value={name}
                placeholder="Your Name..."
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                value={occupation}
                placeholder="Occupation..."
                onChange={(e) => setOccupation(e.target.value)}
              />
            </Box>
          </Box>
          <Box marginBottom="40px">
            <Box display="flex" justifyContent="space-around">
              <Input
                type="email"
                value={email}
                placeholder="Your Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                value={password}
                placeholder="Your Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Box>
          <Box marginBottom="40px">
            <Box display="flex" justifyContent="space-around">
              <Box display="flex" alignItems="center" gap="12px">
                <Typography>Where are you from?</Typography>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{
                    color: theme.palette.primary.main,
                  }}
                >
                  {countriesData.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </Box>
              <Input
                type="text"
                value={phoneNumber}
                placeholder="Your Phone Number..."
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Box>
          </Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              margin: "32px 0",
              padding: "16px",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            Register
          </Button>
          <Box display="flex" justifyContent="center">
            <Typography>
              Already had an account?{" "}
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "#ffda85",
                }}
              >
                {" "}
                Log in here!
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterPage;
