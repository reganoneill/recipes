import { IRecipe } from "./IRecipe";

export interface IListMealsState {
  recipes: IRecipe[];
  allRecipes?: IRecipe[];
  loading: boolean;
}
