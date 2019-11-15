import { GET_QUIZZES, QUIZZES_LOADING, SET_QUIZ } from "./ActionTypes";

const initState = {
  quizzes: [],
  count: 0,
  loading: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_QUIZZES:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case QUIZZES_LOADING:
      return {
        ...state,
        loading: true
      };

    case SET_QUIZ:
      return {
        ...state,
        quiz: action.payload.quiz
      };

    default:
      return state;
  }
}
