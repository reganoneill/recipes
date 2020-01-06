import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import chooseMeal from "../actionCreators/mealChooser";

interface IProps {
  chooseMealBy: string;
  userOptions: string[];
}
interface IState {
  selectedOption: string;
  options: string[];
}

type MostProps = IProps & IState & RouteComponentProps<any>;

//
// const mapStateToProps = (state: MostProps) => ({
//   chooseMealBy: state.chooseMealBy,
//   userOptions: state.userOptions
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   setMealBy(meal: string) {
//     dispatch(chooseMeal(meal));
//   }
// });

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// type Props = PropsFromRedux & MostProps;
//
class ChooseMealBy extends React.Component<MostProps> {
  public state: IState = {
    selectedOption: "",
    options: []
  };

  //   public static getDerivedStateFromProps({
  //     chooseMealBy,
  //     userOptions
  //   }: Props): { selectedOption: string; options: string[] } {
  //     if (userOptions.length) {
  //       return {
  //         selectedOption: chooseMealBy ? chooseMealBy : "",
  //         options: userOptions
  //       };
  //     }

  //     return {
  //       selectedOption: chooseMealBy ? chooseMealBy : "",
  //       options: [
  //         "Time of Day",
  //         "Convenience",
  //         "Style",
  //         "Just show me everything you got"
  //       ]
  //     };
  //   }
  public static getDerivedStateFromProps(props: MostProps) {
    console.log("props:", props);
    return {
      selectedOption: "",
      options: [
        "Time of Day",
        "Convenience",
        "Style",
        "Just show me everything you got"
      ]
    };
  }

  public render() {
    const { selectedOption, options } = this.state;
    return (
      <pre>
        <code>{JSON.stringify(this.props)}</code>
      </pre>
    );
  }
}

//
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

// export default ChooseMealBy;
// export default connector(ChooseMealBy);
