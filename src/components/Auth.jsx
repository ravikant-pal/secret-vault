import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import * as service from "../services/service";
import { InputAdornment, Tooltip } from "@material-ui/core";
import { Mail, Send } from "@material-ui/icons";
import PasswordIcon from "@mui/icons-material/Password";
import GppGoodIcon from "@mui/icons-material/GppGood";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import * as Constants from "../constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3),
  },
}));

export default function Auth({ setIsAuthorizedIp }) {
  const classes = useStyles();
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [otpErr, setOtpErr] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpEndIcon, setOtpEndIcom] = useState(<Send />);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = () => {
    if (service.validateEmail(email)) {
      setSendLoading(true);
      axios
        .post(`${Constants.BASE_URL}/users/send-otp`, { email })
        .then((res) => {
          setSendLoading(false);
          setOtpEndIcom(<DoneAllRoundedIcon />);
          setTimeout(() => {
            setOtpEndIcom(<Send />);
          }, 5000);
          setShowOtpField(true);
          service.setUserId(res.data.userId);
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
    if (service.validateOtp(otp)) {
      setVerifyLoading(true);

      service.getCurrentIp().then((res) => {
        axios
          .post(`${Constants.BASE_URL}/users/verify-otp`, {
            userId: service.getUserId(),
            otp,
            ip: res.data.ip,
          })
          .then((res) => {
            setVerifyLoading(false);
            setIsAuthorizedIp(res.data.ip);
            service.setAuthIp(res.data.ip);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              setOtpErr(true);
            }
            setVerifyLoading(false);
          });
      });
    } else {
      setOtpErr(true);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="fevicon.png"></Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Enter email"
          type="email"
          autoFocus
          error={emailErr}
          helperText={emailErr ? "Not a valid email." : ""}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErr(!service.validateEmail(e.target.value));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail color="secondary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {!emailErr && (
                  <Tooltip title="Send OTP">
                    <LoadingButton
                      size="small"
                      onClick={sendOtp}
                      endIcon={otpEndIcon}
                      loading={sendLoading}
                      loadingPosition="end"
                      variant="text"
                      color="secondary"
                    >
                      Send otp
                    </LoadingButton>
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          }}
        />
        {showOtpField && (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={otpErr}
              fullWidth
              label="Enter 6 digit OTP"
              type="number"
              helperText={otpErr ? "Not a valid OTP" : ""}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpErr(!service.validateOtp(e.target.value));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon color="secondary" />
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              fullWidth
              size="large"
              className={classes.submit}
              onClick={verifyOtp}
              loading={verifyLoading}
              loadingPosition="start"
              startIcon={<GppGoodIcon />}
              variant="contained"
              color="primary"
            >
              Verify
            </LoadingButton>
          </>
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
