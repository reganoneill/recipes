import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
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
            <SignIn path="/app/signin" />
            <ChooseRecipeBy path="/recipes" />
            <TimeOfDay path="/recipes/time-of-day" />
            <Convenience path="/recipes/convenience" />
            <Style path="/recipes/style" />
            <ListMeals path="/recipes/:category/:type" />
            <RecipePage path="/recipes/:recipe" />
            <PrivateRoute path="/admin" component={"Admin"} />
          </Router>
          <footer className="footer">
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
