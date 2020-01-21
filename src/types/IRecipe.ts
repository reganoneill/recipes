export interface IRecipe {
  [index: string]: number | string | string[];
  _id: string;
  meal: string;
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredientList: string[];
  title: string;
  style: string;
  notes: string;
  score: number;
  description: string;
}
