import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { AppBar, Toolbar, Avatar } from "@material-ui/core";
import Keys from "./components/Keys";
import Values from "./components/Values";
import * as service from "./services/service";
import LocalAuth from "./components/LocalAuth";
import Auth from "./components/Auth";
import { Backdrop, CircularProgress } from "@mui/material";

function App() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthorizedIp, setIsAuthorizedIp] = useState(null);
  const [selectedKeyId, setSelectedKeyId] = useState(false);
  const addSecret = () => {
    if (service.getSecret() == null) {
      service.addSecret(secret);
      setAuthenticated(true);
    } else if (service.getSecret() === secret) {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    service
      .getCurrentIp()
      .then((res) => {
        console.log(res.data.ip);
        setIsAuthorizedIp(res.data.ip === service.getAuthIp());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isAuthorizedIp === null ? (
        <Backdrop
          open
          sx={
            ({ color: (theme) => theme.palette.secondary },
            { zIndex: (theme) => theme.zIndex.drawer + 1 })
          }
        >
          <CircularProgress color="secondary" />
        </Backdrop>
      ) : isAuthorizedIp === false ? (
        <Auth setIsAuthorizedIp={setIsAuthorizedIp} />
      ) : authenticated ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={4}>
            <AppBar position="static">
              <Toolbar variant="regular">
                <Avatar src="fevicon.png" />
                <Typography variant="h5" color="inherit">
                  Secret Vault
                </Typography>
              </Toolbar>
            </AppBar>
            <CssBaseline />
            {selectedKeyId ? (
              <Values
                selectedKeyId={selectedKeyId}
                setSelectedKeyId={setSelectedKeyId}
              />
            ) : (
              <Keys setSelectedKeyId={setSelectedKeyId} />
            )}
          </Grid>
        </Grid>
      ) : (
        <LocalAuth
          secret={secret}
          setSecret={setSecret}
          addSecret={addSecret}
        />
      )}
    </>
  );
}

export default App;
