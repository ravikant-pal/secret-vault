import React, { useState } from "react";
import "./Auth.css";

import * as service from "../service";

const Auth = (props) => {
  const { secret, setSecret, addSecret } = props;
  const isSecretPresent = service.getSecret();
  return (
    <div className="login">
      <div className="form">
        <div className="login-form">
          <span className="material-icons">
            <i className="bi bi-shield-lock-fill"></i>
          </span>
          <input
            type="password"
            value={secret}
            placeholder={isSecretPresent ? "Enter Secret" : "Create New Secret"}
            required
            onChange={(e) => setSecret(e.target.value)}
            onKeyPress={(e) => {
              if (e.code === "Enter") {
                addSecret();
              }
            }}
          />
          <button onClick={addSecret}>
            {isSecretPresent ? "GO" : `Let's start`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
