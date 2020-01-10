import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router";
import { IConvenienceState } from "../types/IConvenienceState";
import { IConvenienceProps } from "../types/IConvenienceProps";

// import { Dispatch } from "redux"; //TODO: get this working
import setPage from "../actionCreators/setPage";
import chooseMealConvenience from "../actionCreators/chooseMealConvenience";

import Form from "./Form";

type MostProps = IConvenienceProps &
  IConvenienceState &
  RouteComponentProps<any>;

class Convenience extends React.Component<MostProps> {
  public state: IConvenienceState = {};

  public static getDerivedStateFromProps(nextProps: MostProps, prevState: any) {
    return nextProps.chooseMealBy === prevState.chooseMealBy
      ? {}
      : { selectedOption: nextProps.chooseMealBy };
  }

  public render() {
    return (
      <Form
        title="Convenience"
        options={this.props.options}
        selected={this.props.convenience}
        makeSelection={this.props._chooseConvenience}
        nextUrl={
          this.props.convenience
            ? `/recipes/convenience/${this.props.convenience.toLowerCase()}`
            : ""
        }
      />
    );
  }
}

const mapStateToProps = (state: MostProps) => ({
  convenience: state.mealConvenience.convenience,
  options: state.mealConvenience.options,
  currentPage: state.page
});

const mapDispatchToProps = (dispatch: any) => ({
  _chooseConvenience(ease: string) {
    dispatch(chooseMealConvenience(ease));
  },
  changePage(page: number) {
    dispatch(setPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Convenience);
