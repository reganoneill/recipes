import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link, navigate, RouteComponentProps } from "@reach/router";
import { Provider } from "react-redux";
import store from "./store";
import ChooseRecipeBy from "./components/ChooseRecipeBy";
import TimeOfDay from "./components/TimeOfDay";
import Convenience from "./components/Convenience";
import Style from "./components/Style";
import ListMeals from "./components/ListMeals";
import RecipePage from "./components/RecipePage";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./AuthContext";

const NotFound = (props: RouteComponentProps) => (
  <p className="formContainer">Sorry, nothing here</p>
);

const App = () => {
  const user = useState("");
  return (
    <Provider store={store}>
      <AuthContext.Provider value={user}>
        <div className="mainContainer">
          <header>
            {/* TODO: add this in later when layout comes together */}
            {/* <Link to="/">Recipe Ref</Link> */}
          </header>
          <Router>
            <SignIn path="/recipes/signin" />
            <ChooseRecipeBy path="/recipes" />
            <ListMeals path="/recipes/all" />
            <TimeOfDay path="/recipes/time-of-day" />
            <Convenience path="/recipes/convenience" />
            <Style path="/recipes/style" />
            <ListMeals path="/recipes/:category/:type" />
            <RecipePage path="/recipes/:recipe" />
            <PrivateRoute path="/admin" component={"Admin"} />
            <NotFound default={true} />
          </Router>
          <footer className="footer">
            <button onClick={() => navigate("/recipes/signin")}>sign in</button>
            <p>
              created by{" "}
              <a href="https://github.com/reganoneill" target="_blank">
                regan oneill
              </a>{" "}
              with culinary support from{" "}
              <a href="https://talorae.com/" target="_blank">
                rae
              </a>
            </p>
          </footer>
        </div>
      </AuthContext.Provider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
