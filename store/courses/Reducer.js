import { GET_COURSE, COURSE_LOADING } from "./ActionTypes";

const initState = {
  course: null,
  loading: false,
  updating: false,
  deleting: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_COURSE:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case COURSE_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
