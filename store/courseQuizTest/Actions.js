import {
  SET_QUESTION_INDEX,
  TOGGLE_SHOW_MENU,
  TOGGLE_MENU_AVAILABLE,
  SET_BOOKMARKS,
  SET_STEP
} from "./ActionTypes";
// import Api from "../../api";
// const getEndPoint = (courseId, quizId) => {
//   let endPoint = `/courses/${courseId}/quizzes/${quizId}/questions`;
//   return endPoint;
// };

export const setStep = step => async dispatch => {
  dispatch({
    type: SET_STEP,
    payload: {
      step
    }
  });
};

export const setQuestionIndex = index => async dispatch => {
  dispatch({
    type: SET_QUESTION_INDEX,
    payload: {
      index
    }
  });
};

export const toggleMenuAvailable = () => async dispatch => {
  dispatch({
    type: TOGGLE_MENU_AVAILABLE
  });
};

export const toggleShowMenu = () => async dispatch => {
  dispatch({
    type: TOGGLE_SHOW_MENU
  });
};

export const bookmark = () => async (dispatch, getState) => {
  const rootState = getState();
  let { bookmarks, index } = rootState.courseQuizTest;
  const currentIndex = bookmarks.indexOf(index);
  if (currentIndex === -1) {
    bookmarks.push(index);
  } else {
    bookmarks.splice(currentIndex, 1);
  }
  dispatch({
    type: SET_BOOKMARKS,
    payload: {
      bookmarks: [...bookmarks]
    }
  });
};
