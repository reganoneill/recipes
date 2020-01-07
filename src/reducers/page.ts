const initialState: { page: number } = {
  page: 1
};

export default function page(
  state = initialState,
  action: any // { type: string; payload: string } TODO: get this working
): any {
  switch (action.type) {
    case "SET_PAGE": {
      return {
        ...state,
        page: action.payload
      };
    }
    default:
      return state;
  }
}
