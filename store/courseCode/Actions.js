import { GET_CODE, CODE_LOADING } from "./ActionTypes";
import Api from "../../api";

const endPoint = "/course-codes";

export const getCode = param => async (dispatch, getState) => {
  dispatch({
    type: CODE_LOADING
  });
  const rootState = getState();
  let { course } = rootState.courses;
  let { code } = rootState.courseCode;
  try {
    const result = await Api.get(`${endPoint}/${param}`, {
      params: {
        course_id: course._id
      }
    });
    if (result.status === 200) {
      code = result.data.code;
    } else {
      code = null;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_CODE,
    payload: {
      code
    }
  });
};
