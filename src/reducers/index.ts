import { combineReducers } from "redux";
import mealChooser from "./mealChooser";
import mealTime from "./mealTime";
import mealConvenience from "./mealConvenience";
import mealStyle from "./mealStyle";
import page from "./page";
import theme from "./theme";

export default combineReducers({
  chooseBy: mealChooser,
  mealTime,
  mealConvenience,
  mealStyle,
  page,
  theme
});
