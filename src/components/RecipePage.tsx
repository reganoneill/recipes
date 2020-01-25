import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";
import { getAllRecipes } from "../api/index";
import setRecipes from "../actionCreators/setRecipes";
import { IRecipe } from "../types/IRecipe";
import { IRecipePageState } from "../types/IRecipePageState";

import data from "../data/mock/recipes.json";
type MostProps = RouteComponentProps<any>;

class RecipePage extends React.Component<MostProps> {
  public state: IRecipePageState = {
    recipe: {
      _id: "",
      meal: "",
      difficulty: "",
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      ingredientList: [""],
      title: "",
      style: "",
      notes: "",
      score: 0,
      description: ""
    }
  };

  public componentDidMount() {
    if (this.props.recipes.chosen.length < 1) {
      getAllRecipes().then((allRecipes: any) => {
        this.props._setRecipes(allRecipes);
        const recipe = allRecipes.filter(
          (item: any) =>
            item.title
              .toLowerCase()
              .split(" ")
              .join("-") === this.props.recipe
        )[0];
        this.setState({ recipe });
      });
    } else {
      const recipe = this.props.recipes.chosen.filter(
        (item: any) =>
          item.title
            .toLowerCase()
            .split(" ")
            .join("-") === this.props.recipe
      )[0];
      this.setState({ recipe });
    }
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
          <div className="recipePageTitle zigzag" />
          <div className="recipeDetails">
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
        </div>
      );
    }
  };

  public render() {
    return <div className="recipePage results">{this.renderRecipe()}</div>;
  }
}

const mapStateToProps = (state: MostProps) => ({
  recipes: state.recipes
});

const mapDispatchToProps = (dispatch: any) => ({
  _setRecipes(recipes: IRecipe[]) {
    dispatch(setRecipes(recipes));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
