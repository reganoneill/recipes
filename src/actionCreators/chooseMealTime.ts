export default function chooseMealTime(time: string) {
  return { type: "CHOOSE_MEAL_TIME", payload: time };
}
