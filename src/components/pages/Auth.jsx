import styled from "@emotion/styled";
import {
  DoneAllRounded,
  GppGoodRounded,
  MailRounded,
  PasswordRounded,
  SendRounded,
} from "@mui/icons-material";
import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../config/axios";
import { useCallback, useEffect, useState } from "react";
import {
  getUserId,
  setUserId,
  validateEmail,
  validateOtp,
} from "../../utils/authUtils";
import { LoadingButton } from "@mui/lab";
import Copyright from "../layout/Copyright";

const SVTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: theme.palette.primary.main,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },

    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiFormLabel-root": {
    color: theme.palette.primary.main,
  },
}));

const Auth = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [otpErr, setOtpErr] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpEndIcon, setOtpEndIcom] = useState(<SendRounded />);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const sendOtp = () => {
    if (validateEmail(email)) {
      setSendLoading(true);
      axiosPrivate
        .post(`/users/send-otp`, { email })
        .then((res) => {
          setSendLoading(false);
          setOtpEndIcom(<DoneAllRounded />);
          setShowOtpField(true);
          setUserId(res?.data?.userId);
          startTimer();
        })
        .catch((err) => {
          console.error("Problem sending otp to email =>: ", email);
          console.error(err);
        });
    } else {
      setEmailErr(true);
    }
  };

  const verifyOtp = () => {
    if (validateOtp(otp)) {
      setVerifyLoading(true);
      axiosPrivate
        .post(`/users/verify-otp`, {
          userId: getUserId(),
          otp,
        })
        .then((res) => {
          setVerifyLoading(false);
          setOtpEndIcom(<DoneAllRounded />);
          navigate("/keys");
          setAuth({ accessToken: res.data.accessToken });
        })
        .catch((err) => {
          if (err?.response?.status === 400) {
            setOtpErr(true);
          }
          setVerifyLoading(false);
        });
    } else {
      setOtpErr(true);
    }
  };

  const startTimer = function () {
    if (!timer) {
      setTimer(60);
    }
  };

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    if (timer) {
      setTimeout(timeOutCallback, 1000);
    } else {
      setOtpEndIcom(<SendRounded />);
    }
  }, [timer, timeOutCallback]);
  return (
    <Box
      sx={{
        minWidth: "100%",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      alignItems="center"
      justify="center"
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: -25,
        }}
      >
        <Box
          sx={{
            maxWidth: "40%",
            minHeight: "20vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/secret-vault-high.png"
            alt="Secret Vault Logo"
            style={{
              width: "100px",
              padding: 0,
              margin: 0,
            }}
          />
        </Box>
        <Typography variant="h5" sx={{ m: 1, color: "white" }}>
          Login
        </Typography>
        <SVTextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Enter email"
          type="email"
          autoFocus
          error={emailErr}
          helperText={emailErr ? "Not a valid email." : ""}
          placeholder="abc@mail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErr(!validateEmail(e.target.value));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailRounded color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {email && !emailErr && (
                  <Tooltip title="Send OTP">
                    <LoadingButton
                      size="small"
                      onClick={sendOtp}
                      endIcon={otpEndIcon}
                      loading={sendLoading}
                      disabled={timer !== 0}
                      loadingPosition="end"
                      variant="contained"
                      color="primary"
                    >
                      {timer ? `Resend otp in ${timer % 60} s` : "Send otp"}
                    </LoadingButton>
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          }}
        />
        {showOtpField && (
          <>
            <SVTextField
              variant="outlined"
              margin="normal"
              autoFocus
              required
              fullWidth
              error={otpErr}
              placeholder="Enter 6 digit OTP"
              helperText={otpErr ? "Not a valid OTP" : ""}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpErr(!validateOtp(e.target.value));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordRounded color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              fullWidth
              size="large"
              sx={{
                m: 3,
              }}
              onClick={verifyOtp}
              loading={verifyLoading}
              loadingPosition="start"
              startIcon={<GppGoodRounded />}
              variant="contained"
              color="primary"
            >
              Verify
            </LoadingButton>
          </>
        )}
      </Container>
      <Copyright />
    </Box>
  );
};

export default Auth;
