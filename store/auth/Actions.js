import {
  USER_LOADING,
  GET_USER,
  AUTHORIZING,
  AUTH_SUCCESS,
  LOGOUT
} from "./ActionTypes";
import Api from "../../api";

const apiUrl = "/auth";

export const authGoogle = gToken => async dispatch => {
  dispatch({
    type: AUTHORIZING
  });

  try {
    const result = await Api.post(`${apiUrl}/google`, {
      token: gToken
    });
    if (result.status === 200) {
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          token: result.headers.authorization
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const auth = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  const rootState = getState();
  let { user } = rootState.auth;

  if (!user) {
    try {
      const result = await Api.post(`${apiUrl}`);
      if (result.status === 200) {
        user = result.data.user;
        dispatch({
          type: GET_USER,
          payload: {
            user
          }
        });
      } else {
        throw new Error("Lỗi server");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "Đã hết phiên đăng nhập");
    }
  }
};

export const logout = opts => dispatch => {
  dispatch({
    type: LOGOUT
  });

  opts = opts || {};
  if (typeof opts.reload !== "boolean") opts.reload = true;

  if (opts.reload) {
    window.location.reload();
  }
};
