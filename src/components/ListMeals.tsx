import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
// import { navigate } from "@reach/router"; // TODO: tie this in to link to single meals

import { IListMealsState } from "../types/IListMealsState";
import { IRecipe } from "../types/IRecipe";

import data from "../data/mock/recipes.json";
type MostProps = IListMealsState & RouteComponentProps<any>;

class ListMeals extends React.Component<MostProps> {
  public state: IListMealsState = {
    meals: []
  };

  public componentDidMount() {
    // TODO: GET ALL RECIPES BASED OFF OF THIS.PROPS.TYPE
    const meals = data.recipes.filter(
      (recipe: IRecipe) => recipe[`${this.props.category}`] === this.props.type
    );
    this.setState({ meals });
  }

  public render() {
    return (
      <div className="results">
        {this.state.meals.map((recipe: IRecipe) => {
          let ingredients: JSX.Element[] = [];
          if (recipe.ingredientList) {
            ingredients = recipe.ingredientList.map(ingredient => {
              return <li key={ingredient}>{ingredient}</li>;
            });
          }
          return (
            <div key={recipe.title} className="recipeCard">
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
  }
}
export default ListMeals;
