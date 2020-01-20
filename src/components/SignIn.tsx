import React, { useState, useContext, FunctionComponent } from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import AuthContext from "../AuthContext";
import { signin } from "../api/auth";

type MostProps = RouteComponentProps<any>;
const SignIn: FunctionComponent<MostProps> = () => {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [token, setToken] = useContext(AuthContext);

  const validateCredentials = () => {
    const validateUser = {
      email: username,
      password
    };

    signin(validateUser).then((res: any) => {
      window.localStorage.setItem(
        "recipeToken",
        JSON.stringify(res.data.token)
      );
      setToken(res.data.token);
      navigate("/admin");
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
