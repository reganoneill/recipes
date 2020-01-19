import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router";

import { IListMealsState } from "../types/IListMealsState";
import { IRecipe } from "../types/IRecipe";

import data from "../data/mock/recipes.json";
type MostProps = RouteComponentProps<any>;

class Admin extends React.Component<MostProps> {
  public state: IListMealsState = {
    meals: []
  };

  public componentDidMount() {}

  public render() {
    return (
      <div className="admin">
        <div>
          <h1>success: you are authed in!</h1>
        </div>
      </div>
    );
  }
}
export default Admin;
