import { QUESTIONS_LOADING, GET_QUESTIONS } from "./ActionTypes";

const initState = {
  questions: [],
  count: 0,
  loading: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case QUESTIONS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
