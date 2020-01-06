export default function chooseMeal(option: string) {
  return { type: "CHOOSE_MEAL_BY", payload: option };
}
