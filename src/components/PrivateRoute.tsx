import React from "react";
import { connect } from "react-redux";
import { navigate, RouteComponentProps } from "@reach/router";
import Admin from "./Admin";

import { IUser } from "../types/IUser";

type MostProps = IUser & RouteComponentProps<any>;
// const realAuth = {
//   authorize: (arg: string) => {
//     let userToken = localStorage.getItem("recipeToken");
//     if (arg || userToken) {
//       return true;
//     }
//     return false;
//   }
// };

// const PrivateRoute = ({ component: Component, user: user, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         realAuth.authorize(user.token) ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/app/signin" />
//         )
//       }
//     />
//   );
// };

class PrivateRoute extends React.Component<MostProps> {
  public state: any = {
    storageToken: ""
  };

  public componentDidMount() {
    this.setState({ storageToken: localStorage.getItem("recipeToken") });
  }

  public validUser = this.state.storageToken === this.props.user.token;
  public render() {
    if (this.validUser) {
      return (
        <div>
          <p>render this component:</p>
          <pre>
            <code>{JSON.stringify(this.props.component)}</code>
          </pre>
        </div>
      );
    } else {
      return (
        <div>
          <h1>privateRoute</h1>
          <pre>
            <code>{JSON.stringify(this.props)}</code>
          </pre>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: MostProps) => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);

// TODO:
// create a component which acts as a wrapper for other components which require the user by authenticated.
// this wrapper will look to see if the token in localStorage matches the token which we've saved to the redux store
// if the tokens match -> allow the component (passed in via props) to be rendered
// otherwise kick the user back to the signin page or homepage
