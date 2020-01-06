import { createStore } from "redux";
import reducer from "./reducers/index";

const devTools = () => {
  const toolsExist =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__();

  if (toolsExist) {
    return (window as any).__REDUX_DEVTOOLS_EXTENSION__();
  }

  return (f: any) => f;
};

const store = createStore(reducer, devTools());

export default store;
