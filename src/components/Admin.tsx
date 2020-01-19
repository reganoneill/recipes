import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { navigate } from "@reach/router";
import ErrorBoundary from "../ErrorBoundary";

import { IListMealsState } from "../types/IListMealsState";
import { IRecipe } from "../types/IRecipe";
import { getAllRecipes } from "../api/index";
// import data from "../data/mock/recipes.json";

type MostProps = RouteComponentProps<any>;

class Admin extends React.Component<MostProps> {
  public state: IListMealsState = {
    recipes: []
  };

  public componentDidMount() {
    this.getAllRecipes();
  }

  public getAllRecipes = () => {
    getAllRecipes().then(recipes => {
      this.setState({ recipes });
    });
  };

  public renderRecipes = () => {
    if (!this.state.recipes.length) {
      return <h1>success: you are authed in!</h1>;
    } else {
      const recipeList = this.state.recipes.map((recipe: IRecipe) => {
        let ingredients: JSX.Element[] = [];
        if (recipe.ingredientList) {
          ingredients = recipe.ingredientList.map(ingredient => {
            return <span key={ingredient}>{ingredient}</span>;
          });
        }
        return (
          <div key={recipe.title} className="recipeCard">
            <h4 className="viewTitle">{recipe.title}</h4>
            <p>difficulty: {recipe.convenience}</p>
            <p>Meals: {recipe.time}</p>
            {ingredients.length ? (
              <div className="ingredientSection">
                <p>ingredients:</p>
                <div className="ingredientList">{ingredients}</div>
              </div>
            ) : null}
            <button
              onClick={() =>
                navigate(
                  `/recipes/${recipe.title
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`
                )
              }
            >
              more
            </button>
          </div>
        );
      });
      return recipeList;
    }
  };

  public render() {
    return (
      <div className="admin">
        <div>{this.renderRecipes()}</div>
      </div>
    );
  }
}

export default function DetailsErrorBoundary(props: any) {
  return (
    <ErrorBoundary>
      <Admin />
    </ErrorBoundary>
  );
}
