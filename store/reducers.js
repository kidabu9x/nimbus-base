import { combineReducers } from "redux";
import courses from "./courses/Reducer";
import courseCode from "./courseCode/Reducer";
import courseQuizzes from "./courseQuizzes/Reducer";
import auth from "./auth/Reducer";

export default combineReducers({
  auth,
  courses,
  courseCode,
  courseQuizzes
});
