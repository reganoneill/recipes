import { createContext, SetStateAction, Dispatch } from "react";

const ThemeContext = createContext<[string, Dispatch<SetStateAction<string>>]>([
  "0",
  token => token
]);

export default ThemeContext;
