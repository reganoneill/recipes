import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router";
import { IChooseMealByProps } from "../types/IChooseMealByProps";
import { IChooseMealByState } from "../types/IChooseMealByState";

// import { Dispatch } from "redux"; //TODO: get this working
import chooseMeal from "../actionCreators/mealChooser";
import setPage from "../actionCreators/setPage";

type MostProps = IChooseMealByProps &
  IChooseMealByState &
  RouteComponentProps<any>;

class ChooseMealBy extends React.Component<MostProps> {
  public state: IChooseMealByState = {
    selectedOption: "",
    options: []
  };

  public static getDerivedStateFromProps(nextProps: MostProps, prevState: any) {
    console.log("props:", nextProps);
    return nextProps.chooseMealBy === prevState.chooseMealBy
      ? {}
      : { selectedOption: nextProps.chooseMealBy };
  }

  public render() {
    const { selectedOption, options } = this.state;
    return (
      <div className="formContainer">
        <p className="formTitle">Select meal by...</p>
        <ul className="selectList">
          {this.props.userOptions.map((item, idx) => {
            if (item === this.state.selectedOption) {
              return (
                <li
                  key={item}
                  className="selectedOptionListItem"
                  onClick={() => this.props.setMealBy(item)}
                >
                  {item}
                </li>
              );
            }
            return (
              <li key={item} onClick={() => this.props.setMealBy(item)}>
                {item}
              </li>
            );
          })}
        </ul>
        <button
          onClick={() =>
            navigate(
              `/meals/${this.props.chooseMealBy
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
  chooseMealBy: state.chooseBy.chooseMealBy,
  userOptions: state.chooseBy.userOptions,
  currentPage: state.page
});

const mapDispatchToProps = (dispatch: any) => ({
  setMealBy(meal: string) {
    dispatch(chooseMeal(meal));
  },
  changePage(page: number) {
    dispatch(setPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMealBy);
