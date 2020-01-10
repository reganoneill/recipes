import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router";
import { IStyleProps } from "../types/IStyleProps";
import { IStyleState } from "../types/IStyleState";

// import { Dispatch } from "redux"; //TODO: get this working
import setPage from "../actionCreators/setPage";
import chooseMealStyle from "../actionCreators/chooseMealStyle";

import Form from "./Form";

type MostProps = IStyleProps & IStyleState & RouteComponentProps<any>;

class Style extends React.Component<MostProps> {
  public state: IStyleState = {};

  public static getDerivedStateFromProps(nextProps: MostProps, prevState: any) {
    return nextProps.chooseMealBy === prevState.chooseMealBy
      ? {}
      : { selectedOption: nextProps.chooseMealBy };
  }
  public render() {
    return (
      <Form
        title="Style"
        options={this.props.options}
        selected={this.props.style}
        makeSelection={this.props._chooseMealStyle}
        nextUrl={
          this.props.style
            ? `/recipes/style/${this.props.style.toLowerCase()}`
            : ""
        }
      />
    );
  }
}

const mapStateToProps = (state: MostProps) => ({
  style: state.mealStyle.style,
  options: state.mealStyle.options
});

const mapDispatchToProps = (dispatch: any) => ({
  _chooseMealStyle(meal: string) {
    dispatch(chooseMealStyle(meal));
  },
  changePage(page: number) {
    dispatch(setPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Style);
