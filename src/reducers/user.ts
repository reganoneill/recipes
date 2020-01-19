import { IUser } from "../types/IUser";

const initialState: IUser = {
  token: ""
};

export default function user(
  state = initialState,
  action: any // { type: string; payload: string } TODO: get this working
): any {
  switch (action.type) {
    case "SET_USER_TOKEN": {
      return {
        ...state,
        token: action.payload
      };
    }
    default:
      return state;
  }
}
