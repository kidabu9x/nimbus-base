import Api from "../../api";

import {
  SET_QUESTION_INDEX,
  TOGGLE_SHOW_MENU,
  TOGGLE_MENU_AVAILABLE,
  SET_BOOKMARKS,
  SET_STEP,
  TOGGLE_SUBMITTING,
  TOGGLE_SUBMITTED,
  SET_CORRECT_COUNT,
  GET_QUESTIONS,
  QUESTIONS_LOADING
} from "./ActionTypes";

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
  let { questions, count } = rootState.courseQuizTest;
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

export const resetQuestion = () => async (dispatch, getState) => {
  const rootState = getState();
  const { quiz } = rootState.courseQuizzes;
  const { index } = rootState.courseQuizTest;
  const { questions, menuAvailable } = rootState.courseQuizTest;
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

    dispatch({
      type: GET_QUESTIONS,
      payload: {
        questions: [...questions]
      }
    });
  }
};

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

export const submit = () => async (dispatch, getState) => {
  dispatch({
    type: TOGGLE_SUBMITTING
  });
  const rootState = getState();
  const { course } = rootState.courses;
  const { quiz } = rootState.courseQuizzes;
  let { questions } = rootState.courseQuizTest;

  const endPoint = getEndPoint(course._id, quiz._id);
  const promiseQuestions = questions.map(question => {
    return new Promise((resolve, reject) => {
      Api.post(`${endPoint}/${question._id}/mark`, {
        ...question
      })
        .then(result => {
          if (result.status == 200) {
            resolve(result.data.question);
          } else {
            result(question);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  });
  const answeredQuestions = await Promise.all(promiseQuestions);
  let correctCount = 0;
  answeredQuestions.forEach(q => (q.is_match ? (correctCount += 1) : null));

  dispatch({
    type: GET_QUESTIONS,
    payload: {
      questions: [...answeredQuestions],
      count: answeredQuestions.length
    }
  });

  dispatch({
    type: SET_CORRECT_COUNT,
    payload: {
      count: correctCount
    }
  });

  dispatch({
    type: TOGGLE_SUBMITTING
  });
  dispatch({
    type: TOGGLE_SUBMITTED
  });
};

export const reset = () => async dispatch => {
  dispatch({
    type: TOGGLE_SUBMITTED
  });

  dispatch({
    type: TOGGLE_MENU_AVAILABLE
  });

  dispatch({
    type: GET_QUESTIONS,
    payload: {
      questions: [],
      count: 0
    }
  });

  dispatch({
    type: SET_BOOKMARKS,
    payload: {
      bookmarks: []
    }
  });
};
