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

  public render() {
    return (
      <div className="recipePage">
        {this.state.recipe && this.state.recipe.title ? (
          <p>{this.state.recipe.title}</p>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default RecipePage;
