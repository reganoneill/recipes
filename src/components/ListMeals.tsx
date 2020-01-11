import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router"; // TODO: tie this in to link to single meals

import { IListMealsState } from "../types/IListMealsState";
import { IRecipe } from "../types/IRecipe";

import data from "../data/mock/recipes.json";
type MostProps = RouteComponentProps<any>;

class ListMeals extends React.Component<MostProps> {
  public state: IListMealsState = {
    meals: []
  };

  public componentDidMount() {
    const meals = data.recipes.filter(
      (recipe: any) => recipe[`${this.props.category}`] === this.props.type
    );

    this.setState({ meals });
  }

  public render() {
    return (
      <div className="results">
        <div className="recipeCard">
          <div className="recipePageTitle zigzag">
            <p className="formTitle">Recipes</p>
          </div>
        </div>
        <div className="listAllMeals">
          {this.state.meals.map((recipe: IRecipe) => {
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
          })}
        </div>
      </div>
    );
  }
}
export default ListMeals;
