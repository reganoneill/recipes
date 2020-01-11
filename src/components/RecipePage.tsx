import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";

import { IRecipePageState } from "../types/IRecipePageState";

import data from "../data/mock/recipes.json";
type MostProps = RouteComponentProps<any>;

class RecipePage extends React.Component<MostProps> {
  public state: IRecipePageState = {
    recipe: undefined
  };

  public componentDidMount() {
    const recipe = data.recipes.filter(
      (item: any) =>
        item.title
          .toLowerCase()
          .split(" ")
          .join("-") === this.props.recipe
    )[0];

    this.setState({ recipe });
  }

  public renderRecipe = () => {
    let ingredients: JSX.Element[] = [];
    if (this.state.recipe && this.state.recipe.ingredientList) {
      ingredients = this.state.recipe.ingredientList.map(ingredient => {
        return <span key={ingredient}>{ingredient}</span>;
      });
    }

    if (this.state.recipe && this.state.recipe.title) {
      return (
        <div className="recipeCard">
          <p className="formTitle">{this.state.recipe.title}</p>
          <p>Style: {this.state.recipe.style}</p>
          <p>Meal: {this.state.recipe.time}</p>
          <p>Difficulty: {this.state.recipe.convenience}</p>
          <p>Prep Time:{this.state.recipe.prepTimeMinutes}</p>
          <p>Cook Time: {this.state.recipe.cookTimeMinutes}</p>
          <p>Notes:</p>
          <p className="recipeNotes">{this.state.recipe.notes}</p>
          {this.state.recipe.ingredientList.length ? (
            <div className="ingredientSection">
              <p>ingredients:</p>
              <div className="ingredientList">{ingredients}</div>
            </div>
          ) : null}
        </div>
      );
    }
  };

  public render() {
    return <div className="recipePage">{this.renderRecipe()}</div>;
  }
}
export default RecipePage;
