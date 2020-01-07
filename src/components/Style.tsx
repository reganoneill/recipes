import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { navigate } from "@reach/router";
import { IStyleProps } from "../types/IStyleProps";
import { IStyleState } from "../types/IStyleState";

// import { Dispatch } from "redux"; //TODO: get this working
import setPage from "../actionCreators/setPage";
import chooseMealStyle from "../actionCreators/chooseMealStyle";

type MostProps = IStyleProps & IStyleState & RouteComponentProps<any>;

class Style extends React.Component<MostProps> {
  public state: IStyleState = {};

  public static getDerivedStateFromProps(nextProps: MostProps, prevState: any) {
    console.log("props:", nextProps);

    return nextProps.chooseMealBy === prevState.chooseMealBy
      ? {}
      : { selectedOption: nextProps.chooseMealBy };
  }

  public render() {
    return (
      <div className="formContainer">
        <p className="formTitle">Style</p>
        <ul className="selectList">
          {this.props.options.map((style: string) => {
            if (style === this.props.style) {
              return (
                <li
                  key={style}
                  className="selectedOptionListItem"
                  onClick={() => this.props._chooseMealStyle(style)}
                >
                  {style}
                </li>
              );
            }
            return (
              <li
                key={style}
                onClick={() => this.props._chooseMealStyle(style)}
              >
                {style}
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
