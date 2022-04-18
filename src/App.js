import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { AppBar, Toolbar, Box } from "@material-ui/core";
import Keys from "./components/Keys";
import Values from "./components/Values";
import * as service from "./services/service";
import Auth from "./components/Auth";

function App() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState(false);

  const addSecret = () => {
    if (service.getSecret() == null) {
      service.addSecret(secret);
      setAuthenticated(true);
    } else if (service.getSecret() == secret) {
      setAuthenticated(true);
    }
  };

  return (
    <>
      {authenticated ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={4}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
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
        <Auth addSecret={addSecret} secret={secret} setSecret={setSecret} />
      )}
    </>
  );
}

export default App;
