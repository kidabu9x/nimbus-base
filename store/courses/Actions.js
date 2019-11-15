import { GET_COURSE, COURSE_LOADING } from "./ActionTypes";
import Api from "../../api";

const endPoint = "/courses";

export const getCourse = id => async (dispatch, getState) => {
  dispatch({
    type: COURSE_LOADING
  });
  const rootState = getState();
  let { course } = rootState.courses;
  if (!course || [course._id, course.slug].indexOf(id) === -1) {
    try {
      const result = await Api.get(`${endPoint}/${id}`);
      if (result.status === 200) {
        course = result.data.course;
      }
    } catch (error) {
      console.log(error);
    }
  }

  dispatch({
    type: GET_COURSE,
    payload: {
      course
    }
  });
};
