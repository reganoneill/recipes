import { IRecipe } from "../types/IRecipe";

export default function setRecipes(recipes: IRecipe[]) {
  return { type: "SET_RECIPES", payload: recipes };
}
