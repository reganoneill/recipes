import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router";
import { ITimeOfDayState } from "../types/ITimeOfDayState";
import { ITimeOfDayProps } from "../types/ITimeOfDayProps";

// import { Dispatch } from "redux"; //TODO: get this working
import setPage from "../actionCreators/setPage";
import chooseMealTime from "../actionCreators/chooseMealTime";

import Form from "./Form";

type MostProps = ITimeOfDayProps & ITimeOfDayState & RouteComponentProps<any>;

class TimeOfDay extends React.Component<MostProps> {
  public state: ITimeOfDayState = {};

  public static getDerivedStateFromProps(nextProps: MostProps, prevState: any) {
    return nextProps.chooseMealBy === prevState.chooseMealBy
      ? {}
      : { selectedOption: nextProps.chooseMealBy };
  }

  public render() {
    return (
      <Form
        title="Time of day"
        options={this.props.meal.mealTimes}
        selected={this.props.meal.mealTime}
        makeSelection={this.props._chooseMealTime}
        nextUrl={
          this.props.meal.mealTime
            ? `/meals/time/${this.props.meal.mealTime.toLowerCase()}`
            : ""
        }
      />
    );
  }
}

const mapStateToProps = (state: MostProps) => ({
  meal: state.mealTime,
  currentPage: state.page
});

const mapDispatchToProps = (dispatch: any) => ({
  _chooseMealTime(meal: string) {
    dispatch(chooseMealTime(meal));
  },
  changePage(page: number) {
    dispatch(setPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeOfDay);
