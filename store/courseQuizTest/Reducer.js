import {
  SET_BOOKMARKS,
  SET_QUESTION_INDEX,
  SET_STEP,
  TOGGLE_MENU_AVAILABLE,
  TOGGLE_SHOW_MENU
} from "./ActionTypes";

const initState = {
  step: 1,
  bookmarks: [],
  index: -1,
  menuAvailable: false,
  showMenu: false
};

export default function(state = initState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
