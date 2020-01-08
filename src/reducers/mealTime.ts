const initialState: { mealTime: string; mealTimes: string[] } = {
  mealTime: "",
  mealTimes: ["Breakfast", "Lunch", "Dinner", "Anytime"]
};

export default function mealTimeChooser(
  state = initialState,
  action: any // { type: string; payload: string } TODO: get this working
): any {
  switch (action.type) {
    case "CHOOSE_MEAL_TIME": {
      return {
        ...state,
        mealTime: action.payload
      };
    }
    default:
      return state;
  }
}
