import React, { FunctionComponent, Fragment } from "react";
import { IResultsProps } from "./types/IResultsProps";

const Results: FunctionComponent<IResultsProps> = ({ recipes }) => {
  return (
    <div className="results">
      {recipes.map((recipe, idx) => {
        let ingredients: JSX.Element[] = [];
        if (recipe.ingredientList) {
          ingredients = recipe.ingredientList.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>;
          });
        }
        return (
          <div key={idx} className="recipeCard">
            <hr />
            <h4>{recipe.title}</h4>
            <p>difficulty: {recipe.difficulty}</p>
            <p>meal: {recipe.time}</p>
            {ingredients.length ? (
              <Fragment>
                <p>ingredients:</p>
                <ul>{ingredients}</ul>
              </Fragment>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Results;
