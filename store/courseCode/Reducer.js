import { GET_CODE, CODE_LOADING } from "./ActionTypes";

const initState = {
  code: null,
  loading: false,
  isInvalid: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_CODE:
      return {
        ...state,
        code: action.payload.code,
        isInvalid: action.payload.code === null,
        loading: false
      };

    case CODE_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
