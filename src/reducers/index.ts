import { combineReducers } from "redux";
import mealChooser from "./mealChooser";
import theme from "./theme";

export default combineReducers({
  chooseBy: mealChooser,
  theme
});
