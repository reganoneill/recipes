import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import { Provider } from "react-redux";
import store from "./store";
import ThemeContext from "./ThemeContext";
// import SearchParams from "./SearchParams";
import ChooseMealBy from "./components/ChooseMealBy";
import TimeOfDay from "./components/TimeOfDay";
import Convenience from "./components/Convenience";
import Style from "./components/Style";
import ListMeals from "./components/ListMeals";

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
          {/* <SearchParams path="/" /> */}
          <ChooseMealBy path="/meals" />
          <TimeOfDay path="/meals/time-of-day" />
          <Convenience path="/meals/convenience" />
          <Style path="/meals/style" />
          <ListMeals path="/meals/:category/:type" />
          {/* TODO: add this in later to reference individual recipes */}
          {/* <Details path="/details/:id" /> */}
        </Router>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
