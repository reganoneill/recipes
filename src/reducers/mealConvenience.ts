const initialState: { convenience: string; options: string[] } = {
  convenience: "",
  options: ["Easy", "Medium", "Hard"]
};

export default function mealConvenienceChooser(
  state = initialState,
  action: any // { type: string; payload: string } TODO: get this working
): any {
  switch (action.type) {
    case "CHOOSE_MEAL_CONVENIENCE": {
      return {
        ...state,
        convenience: action.payload
      };
    }
    default:
      return state;
  }
}
