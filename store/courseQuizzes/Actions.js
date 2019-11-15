import { GET_QUIZZES, QUIZZES_LOADING, SET_QUIZ } from "./ActionTypes";
import Api from "../../api";

const getEndPoint = courseId => {
  let endPoint = `/courses/${courseId}/quizzes`;
  return endPoint;
};

export const getQuizzes = () => async (dispatch, getState) => {
  dispatch({
    type: QUIZZES_LOADING
  });
  const rootState = getState();
  const { course } = rootState.courses;
  let { quizzes, count } = rootState.courseQuizzes;
  const endPoint = getEndPoint(course._id);
  try {
    const result = await Api.get(`${endPoint}`);
    if (result.status === 200) {
      quizzes = result.data.quizzes;
      count = result.data.count;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_QUIZZES,
    payload: {
      quizzes,
      count
    }
  });
};

export const setQuiz = quizId => (dispatch, getState) => {
  const rootState = getState();
  const { quizzes } = rootState.courseQuizzes;
  let quiz = quizzes.findOne(quiz => quiz._id === quizId);
  dispatch({
    type: SET_QUIZ,
    payload: {
      quiz
    }
  });
};
