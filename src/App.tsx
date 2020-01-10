import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import { Provider } from "react-redux";
import store from "./store";
import ThemeContext from "./ThemeContext";
// import SearchParams from "./SearchParams";
import ChooseRecipeBy from "./components/ChooseRecipeBy";
import TimeOfDay from "./components/TimeOfDay";
import Convenience from "./components/Convenience";
import Style from "./components/Style";
import ListMeals from "./components/ListMeals";
import RecipePage from "./components/RecipePage";

const App = () => {
  const theme = useState("darkblue");
  return (
    <Provider store={store}>
      <div className="mainContainer">
        <header>
          {/* TODO: add this in later when layout comes together */}
          {/* <Link to="/">Recipe Ref</Link> */}
        </header>
        <Router>
          <ChooseRecipeBy path="/recipes" />
          <TimeOfDay path="/recipes/time-of-day" />
          <Convenience path="/recipes/convenience" />
          <Style path="/recipes/style" />
          <ListMeals path="/recipes/:category/:type" />
          <RecipePage path="/recipes/:recipe" />
        </Router>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
