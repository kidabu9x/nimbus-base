import {
  QUESTIONS_LOADING,
  GET_QUESTIONS,
  TOGGLE_MENU_AVAILABLE,
  TOGGLE_SHOW_MENU,
  SET_QUESTION_INDEX,
  SET_BOOKMARK
} from "./ActionTypes";

const initState = {
  questions: [],
  bookmarks: [],
  index: -1,
  count: 0,
  loading: false,
  menuAvailable: false,
  showMenu: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.payload,
        loading: false
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

    case SET_BOOKMARK:
      return {
        ...state,
        bookmarks: action.payload.bookmarks
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
