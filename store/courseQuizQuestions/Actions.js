import {
  GET_QUESTIONS,
  QUESTIONS_LOADING,
  SET_QUESTION_INDEX,
  TOGGLE_SHOW_MENU,
  TOGGLE_MENU_AVAILABLE
} from "./ActionTypes";
import Api from "../../api";

const getEndPoint = (courseId, quizId) => {
  let endPoint = `/courses/${courseId}/quizzes/${quizId}/questions`;
  return endPoint;
};

export const getQuestions = () => async (dispatch, getState) => {
  dispatch({
    type: QUESTIONS_LOADING
  });
  const rootState = getState();
  const { course } = rootState.courses;
  const { quiz } = rootState.courseQuizzes;
  let { questions, count } = rootState.courseQuizQuestions;
  const endPoint = getEndPoint(course._id, quiz._id);
  try {
    const result = await Api.get(`${endPoint}/generate`);
    if (result.status === 200) {
      questions = result.data.questions;
      count = result.data.count;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_QUESTIONS,
    payload: {
      questions,
      count
    }
  });
};

export const setQuestionIndex = index => async (dispatch, getState) => {
  dispatch({
    type: SET_QUESTION_INDEX,
    payload: {
      index
    }
  });

  const rootState = getState();
  const { quiz } = rootState.courseQuizzes;
  const { questions, menuAvailable } = rootState.courseQuizQuestions;
  if (!menuAvailable && !!quiz.ask_questions_again_when_returning) {
    let question = questions[index];
    if (question) {
      if (["multiple_choices", "single_choice"].indexOf(question.type) === 1) {
        question.answers = question.answers.map(answer => {
          answer.user_choice = false;
          return answer;
        });
      } else if (
        ["pairing"].indexOf(question.type) === 1 &&
        question.temporary_pairing_answers
      ) {
        question.temporary_pairing_answers.map(answer => {
          answer.id = null;
          answer.title = "";
          answer.is_match_with = null;
          return answer;
        });
      }
    }
  }
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
