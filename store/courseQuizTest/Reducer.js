import {
  SET_BOOKMARKS,
  SET_QUESTION_INDEX,
  SET_STEP,
  TOGGLE_MENU_AVAILABLE,
  TOGGLE_SHOW_MENU,
  TOGGLE_SUBMITTING,
  TOGGLE_SUBMITTED,
  QUESTIONS_LOADING,
  GET_QUESTIONS
} from "./ActionTypes";

const initState = {
  questions: [],
  count: 0,
  loading: false,
  step: 1,
  bookmarks: [],
  index: -1,
  menuAvailable: false,
  showMenu: false,
  submitting: false,
  submitted: false
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

    case SET_STEP:
      return {
        ...state,
        step: action.payload.step
      };

    case SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload.bookmarks
      };

    case SET_QUESTION_INDEX:
      return {
        ...state,
        index: action.payload.index
      };

    case TOGGLE_MENU_AVAILABLE:
      return {
        ...state,
        menuAvailable: !state.menuAvailable
      };

    case TOGGLE_SHOW_MENU:
      return {
        ...state,
        showMenu: !state.showMenu
      };

    case TOGGLE_SUBMITTING:
      return {
        ...state,
        submitting: !state.submitting
      };

    case TOGGLE_SUBMITTED:
      return {
        ...state,
        submitted: !state.submitted
      };
    default:
      return state;
  }
}
