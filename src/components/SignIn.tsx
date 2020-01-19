import React, { useState, useContext, FunctionComponent } from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import ThemeContext from "../ThemeContext";

import { IUser } from "../types/IUser";
import setUser from "../actionCreators/setUser";
import axios from "axios";

type MostProps = IUser & RouteComponentProps<any>;

class SignIn extends React.Component<MostProps> {
  public state: any = {
    username: "",
    password: "",
    userContext: ""
  };

  // public const [theme: string, setTheme: any] = useContext(ThemeContext: any);

  static contextType = ThemeContext;

  public componentDidMount() {
    this.setState({ userContext: this.context.user });
  }

  public validateCredentials = () => {
    const validateUser: IUser = {
      email: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://localhost:8083/signin", validateUser)
      .then(res => {
        window.localStorage.setItem(
          "recipeToken",
          JSON.stringify(res.data.token)
        );
        this.props._setUser({ token: res.data.token });
        navigate("/admin");
      })
      .catch(err => {
        console.error("an error occurred:", err);
      });
  };

  public updateField = (input: string, fieldName: string) => {
    this.setState({ [`${fieldName}`]: input });
  };

  public render() {
    return (
      <form
        className="signinContainer"
        onSubmit={e => {
          e.preventDefault();
          this.validateCredentials();
        }}
      >
        <label>username:</label>
        <input
          type="text"
          value={this.state.username}
          onChange={e => this.updateField(e.target.value, "username")}
        />
        <label>password:</label>
        <input
          type="password"
          value={this.state.password}
          onChange={e => this.updateField(e.target.value, "password")}
        />
        <button>Submit</button>
        {/* <div>
          <p>local state:</p>
          <pre>
            <code>{JSON.stringify(this.state)}</code>
          </pre>
          <p>redux user below:</p>
          <pre>
            <code>{JSON.stringify(this.props.user)}</code>
          </pre>
        </div> */}
      </form>
    );
  }
}

// export default SignIn;

const mapStateToProps = (state: MostProps) => ({
  user: state.user,
  options: state.mealConvenience.options,
  currentPage: state.page
});

const mapDispatchToProps = (dispatch: any) => ({
  _setUser(user: { token: string }) {
    dispatch(setUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
