import { createContext, SetStateAction, Dispatch } from "react";

const AuthContext = createContext<[string, Dispatch<SetStateAction<string>>]>([
  "",
  token => token
]);

export default AuthContext;
