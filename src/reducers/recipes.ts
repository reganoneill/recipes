import { IRecipe } from "../types/IRecipe";

const initialState: { chosen: IRecipe[] } = {
  chosen: []
};

export default function mealTimeChooser(
  state = initialState,
  action: any // { type: string; payload: string } TODO: get this working
): any {
  switch (action.type) {
    case "SET_RECIPES": {
      return {
        ...state,
        chosen: action.payload
      };
    }
    default:
      return state;
  }
}
