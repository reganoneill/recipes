import { IStyleProps } from "../types/IStyleProps";

const initialState: IStyleProps = {
  style: "",
  options: ["Mexican", "American", "Asian", "Other"]
};

export default function mealStyleChooser(
  state = initialState,
  action: any // { type: string; payload: string } TODO: get this working
): any {
  switch (action.type) {
    case "CHOOSE_MEAL_STYLE": {
      return {
        ...state,
        style: action.payload
      };
    }
    default:
      return state;
  }
}
