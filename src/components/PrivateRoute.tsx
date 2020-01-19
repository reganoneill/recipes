import React, { useContext } from "react";
import { Redirect, RouteComponentProps } from "@reach/router";
import AuthContext from "../AuthContext";
import Admin from "./Admin";

type MostProps = RouteComponentProps<any> & any;

const PrivateRoute: any = (props: MostProps) => {
  const [token, setToken] = useContext(AuthContext);
  let userToken = localStorage.getItem("recipeToken");
  userToken = userToken ? userToken.replace(/['"]+/g, "") : "";

  if (!token || !userToken || token !== userToken) {
    return <Redirect from="/admin" to="/app/signin" />;
  } else {
    switch (props.component) {
      case "Admin":
        return <Admin />;
      default:
        return <Redirect from="/admin" to="/app/signin" />;
    }
  }
};

export default PrivateRoute;
