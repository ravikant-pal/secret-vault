import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import * as service from "../services/service";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { VisibilityOffRounded } from "@mui/icons-material";
import { VisibilityRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Auth(props) {
  const classes = useStyles();

  const { secret, setSecret, addSecret } = props;
  const isSecretPresent = service.getSecret();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Current Device Password
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={isSecretPresent ? "Enter Password" : "Create New Password"}
          type={showPassword ? "text" : "password"}
          autoFocus
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              addSecret();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                <Tooltip
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  <InputAdornment position="end">
                    {showPassword ? (
                      <VisibilityOffRounded />
                    ) : (
                      <VisibilityRounded />
                    )}
                  </InputAdornment>
                </Tooltip>
              </IconButton>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={addSecret}
        >
          {isSecretPresent ? "GO" : `Let's start`}
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
