import { GET_QUESTIONS, QUESTIONS_LOADING } from "./ActionTypes";
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
