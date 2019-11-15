import { parseCookies, setCookie } from "nookies";
import {
  USER_LOADING,
  GET_USER,
  AUTHORIZING,
  AUTH_SUCCESS,
  LOGOUT
} from "./ActionTypes";

const initState = {
  user: null,
  loading: false,
  token: parseCookies().token,
  isAuthenticated: false,
  authorizing: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false
      };

    case USER_LOADING:
      return {
        ...state,
        loading: true
      };

    case AUTHORIZING:
      return {
        ...state,
        authorizing: true
      };

    case AUTH_SUCCESS:
      setCookie({}, "token", action.payload.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });

      return {
        ...state,
        token: action.payload.token,
        authorizing: false
      };

    case LOGOUT:
      // destroyCookie({}, "token");
      setCookie({}, "token", "", {
        maxAge: -1,
        path: "/"
      });
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
}
