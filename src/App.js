import React, { useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import * as service from "./service";

function App() {
  const [secret, setSecret] = useState("");

  const [authenticated, setAuthenticated] = useState(false);

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
        <Home />
      ) : (
        <Auth addSecret={addSecret} secret={secret} setSecret={setSecret} />
      )}
    </>
  );
}

export default App;
