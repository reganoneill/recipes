import React, { useState, useContext, FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useDropdown from "./useDropdown";

import { IRecipe } from "./types/IRecipe";

// dev/test only
import * as recipeData from "./data/mock/recipes.json";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [checked, setChecked] = useState("all");
  const [recipes, updateRecipes] = useState(recipeData.recipes as IRecipe[]);
  const [meal, MealTypeDropdown, updateMealType] = useDropdown(
    "Meal",
    "Breakfast",
    ["Breakfast", "Lunch", "Dinner"]
  );
  const [
    difficulty,
    MealDifficulty,
    updateMealDifficultyLevel
  ] = useDropdown("Difficulty", "easy", ["easy", "medium", "hard"]);
  const [style, MealStyle, updateMealStyle] = useDropdown("Style", "mexican", [
    "mexican",
    "american",
    "asian",
    "italian",
    "other"
  ]);

  const staticRecipeDataset: IRecipe[] = recipeData.recipes;

  const radioHandleInputChange = (e: InputEvent): void => {
    setChecked(e.target.value);
  };

  const requestMeals = () => {
    if (checked === "all") {
      updateRecipes(staticRecipeDataset);
      return;
    }

    const fetchData: { [key: string]: string } = {
      meal,
      difficulty,
      style
    };

    const requestedRecipes = staticRecipeDataset.filter(
      (recipe, idx) => recipe[checked] === fetchData[checked].toLowerCase()
    );

    updateRecipes(requestedRecipes);
  };

  return (
    <div className="appContainer">
      <form
        className="formBar"
        onSubmit={e => {
          e.preventDefault();
          requestMeals();
        }}
      >
        <div className="formItemContainer">
          <div className="formItem">
            <p>Meal</p>
            <MealTypeDropdown />
            <input
              type="radio"
              value="meal"
              onChange={radioHandleInputChange}
              checked={checked === "meal"}
            />
          </div>
          <div className="formItem">
            <p>Difficulty</p>
            <MealDifficulty />
            <input
              type="radio"
              value="difficulty"
              onChange={radioHandleInputChange}
              checked={checked === "difficulty"}
            />
          </div>
          <div className="formItem">
            <p>Style</p>
            <MealStyle />
            <input
              type="radio"
              value="style"
              onChange={radioHandleInputChange}
              checked={checked === "style"}
            />
          </div>
          <div className="formItem">
            <p>Show All</p>
            <input
              type="radio"
              value="all"
              onChange={radioHandleInputChange}
              checked={checked === "all"}
            />
          </div>
        </div>
        <button>Submit</button>
      </form>
      <Results recipes={recipes} />
    </div>
  );
};

export default SearchParams;
