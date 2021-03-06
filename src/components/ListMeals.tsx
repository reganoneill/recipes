import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";
import { sortBy, startCase } from "lodash";
import { Link } from "@reach/router";
import { getAllRecipes } from "../api/index";
import { IListMealsState } from "../types/IListMealsState";
import setRecipes from "../actionCreators/setRecipes";

import { IRecipe } from "../types/IRecipe";

type MostProps = RouteComponentProps<any>;

class ListMeals extends React.Component<MostProps> {
  public state: IListMealsState = {
    allRecipes: [],
    recipes: [],
    loading: true
  };

  public componentDidMount() {
    getAllRecipes().then(allRecipes => {
      this.props._setRecipes(allRecipes);
      this.setState({ loading: false });
    });
  }

  public determineRender = () => {
    if (this.state.loading) {
      return (
        <div className="loading">
          <p>loading...</p>
        </div>
      );
    }

    if (this.props.recipes.chosen.length) {
      if (this.props.path === "/recipes/all") {
        return this.renderRecipes(this.props.recipes.chosen);
      } else {
        const recipes = this.props.recipes.chosen.filter(
          (recipe: IRecipe) =>
            recipe[`${this.props.category}`] === this.props.type
        );
        return this.renderRecipes(recipes);
      }
    } else {
      return <div>no recipes to display</div>;
    }
  };

  public renderRecipes = (recipes: IRecipe[]) => {
    const newRecipes = sortBy(recipes, recipe => startCase(recipe.title));

    return newRecipes.map((recipe: IRecipe) => {
      let ingredients: JSX.Element[] = [];
      if (recipe.ingredientList) {
        ingredients = recipe.ingredientList.map(ingredient => {
          return <span key={ingredient}>{ingredient}</span>;
        });
      }
      const linkString = `/recipes/${recipe.title
        .toLowerCase()
        .split(" ")
        .join("-")}`;
      return (
        <div key={recipe.title} className="recipeCard">
          <h4 className="viewTitle">
            <Link to={linkString}>{recipe.title}</Link>
          </h4>
          <p>difficulty: {recipe.convenience}</p>
          {ingredients.length ? (
            <div className="ingredientSection">
              <p>ingredients:</p>
              <div className="ingredientList">{ingredients}</div>
            </div>
          ) : null}
        </div>
      );
    });
  };

  public render() {
    return (
      <div className="results">
        <div className="recipeCard">
          <p className="formTitle">Recipes</p>
          <div className="recipePageTitle zigzag" />
        </div>
        <div className="listAllMeals">{this.determineRender()}</div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ListMeals);
