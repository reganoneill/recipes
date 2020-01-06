import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
// import { Dispatch } from "redux"; //TODO: get this working
import chooseMeal from "../actionCreators/mealChooser";

interface IProps {
  chooseMealBy: string;
  userOptions: string[];
  setMealBy: any;
}
interface IState {
  selectedOption: string;
  options: string[];
}

type MostProps = IProps & IState & RouteComponentProps<any>;

class ChooseMealBy extends React.Component<MostProps> {
  public state: IState = {
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
      <div>
        <p>state</p>
        <pre>
          <code>{JSON.stringify(this.state)}</code>
        </pre>
        <ul>
          {this.props.userOptions.map((item, idx) => {
            return (
              <li key={idx} onClick={() => this.props.setMealBy(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: MostProps) => ({
  chooseMealBy: state.chooseBy.chooseMealBy,
  userOptions: state.chooseBy.userOptions
});

const mapDispatchToProps = (dispatch: any) => ({
  setMealBy(meal: string) {
    dispatch(chooseMeal(meal));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMealBy);
