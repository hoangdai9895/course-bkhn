import { combineReducers } from "redux";
import authReducer from "./auth";
import courseReducer from "./course";
import questionReducer from "./question";
import categoryReducer from "./category";
import resultReducer from "./result";

export default combineReducers({
  auth: authReducer,
  course: courseReducer,
  question: questionReducer,
  category: categoryReducer,
  result: resultReducer,
});
