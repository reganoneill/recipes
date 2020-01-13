import React, { useState, FunctionComponent } from "react";
import { navigate, RouteComponentProps } from "@reach/router";

import axios from "axios";

type MostProps = RouteComponentProps<any>;
const SignIn: FunctionComponent<MostProps> = () => {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");

  const validateCredentials = () => {
    const validateUser = {
      email: username,
      password
    };
    console.log("send this:", validateUser);
    axios
      .post("http://localhost:8083/signin", validateUser)
      .then(data => {
        console.log("got data:", data);
      })
      .catch(err => {
        console.error("an error occurred:", err);
      });
  };
  return (
    <form
      className="signinContainer"
      onSubmit={e => {
        e.preventDefault();
        validateCredentials();
      }}
    >
      <label>username:</label>
      <input
        type="text"
        value={username}
        onChange={e => updateUsername(e.target.value)}
      />
      <label>password:</label>
      <input
        type="password"
        value={password}
        onChange={e => updatePassword(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};

export default SignIn;
