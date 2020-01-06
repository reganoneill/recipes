const initialState: any = {
  chooseMealBy: "",
  userOptions: ["Time of Day", "Convenience", "Style", "Show Me Everything"]
};

export default function mealChooser(
  state = initialState,
  action: any // { type: string; payload: string } TODO: get this working
): any {
  switch (action.type) {
    case "CHOOSE_MEAL_BY": {
      return {
        ...state,
        chooseMealBy: action.payload
      };
    }
    default:
      return state;
  }
}
