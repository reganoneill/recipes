import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router";
import { IConvenienceState } from "../types/IConvenienceState";
import { IConvenienceProps } from "../types/IConvenienceProps";

// import { Dispatch } from "redux"; //TODO: get this working
import setPage from "../actionCreators/setPage";
import chooseMealConvenience from "../actionCreators/chooseMealConvenience";

type MostProps = IConvenienceProps &
  IConvenienceState &
  RouteComponentProps<any>;

class Convenience extends React.Component<MostProps> {
  public state: IConvenienceState = {};

  public static getDerivedStateFromProps(nextProps: MostProps, prevState: any) {
    console.log("props:", nextProps);

    return nextProps.chooseMealBy === prevState.chooseMealBy
      ? {}
      : { selectedOption: nextProps.chooseMealBy };
  }

  public render() {
    return (
      <div className="formContainer">
        {/* <pre>
          <code>{JSON.stringify(this.props)}</code>
        </pre> */}
        <p className="formTitle">Convenience</p>
        <ul className="selectList">
          {this.props.options.map((ease: string) => {
            if (ease === this.props.convenience) {
              return (
                <li
                  key={ease}
                  className="selectedOptionListItem"
                  onClick={() => this.props._chooseConvenience(ease)}
                >
                  {ease}
                </li>
              );
            }
            return (
              <li
                key={ease}
                onClick={() => this.props._chooseConvenience(ease)}
              >
                {ease}
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
  //   meal: state.mealTime,
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
