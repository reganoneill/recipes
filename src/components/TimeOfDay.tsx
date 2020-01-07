import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router";
import { ITimeOfDayState } from "../types/ITimeOfDayState";
import { ITimeOfDayProps } from "../types/ITimeOfDayProps";

// import { Dispatch } from "redux"; //TODO: get this working
import setPage from "../actionCreators/setPage";
import chooseMealTime from "../actionCreators/chooseMealTime";

type MostProps = ITimeOfDayProps & ITimeOfDayState & RouteComponentProps<any>;

class TimeOfDay extends React.Component<MostProps> {
  public state: ITimeOfDayState = {};

  public static getDerivedStateFromProps(nextProps: MostProps, prevState: any) {
    console.log("props:", nextProps);

    return nextProps.chooseMealBy === prevState.chooseMealBy
      ? {}
      : { selectedOption: nextProps.chooseMealBy };
  }

  public render() {
    return (
      <div className="formContainer">
        <p className="formTitle">Time Of Day</p>
        <ul className="selectList">
          {this.props.meal.mealTimes.map((time: string) => {
            if (time === this.props.meal.mealTime) {
              return (
                <li
                  key={time}
                  className="selectedOptionListItem"
                  onClick={() => this.props._chooseMealTime(time)}
                >
                  {time}
                </li>
              );
            }
            return (
              <li key={time} onClick={() => this.props._chooseMealTime(time)}>
                {time}
              </li>
            );
          })}
        </ul>
        <button
          onClick={() =>
            navigate(
              `/${this.props.chooseMealBy
                .toLowerCase()
                .split(" ")
                .join("-")}`
            )
          }
        >
          -> Next ->
        </button>
      </div>
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
