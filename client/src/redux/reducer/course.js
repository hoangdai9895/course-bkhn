import {
  SET_COURSE_LOADING,
  COURSE_GET_ALL,
  COURSE_GET_ALL_FAILED,
  COURSE_ADD_FAILED,
  COURSE_ADD,
  COURSE_REMOVE,
  COURSE_GET_BY_ID,
  COURSE_GET_BY_ID_FAILED,
  COURSE_REMOVE_FAILED,
} from "../actions/type";

const initialState = {
  loadingCourse: false,
  courses: [],
  err: null,
  loading: false,
  course: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COURSE_LOADING:
      return { ...state, loading: true };
    case COURSE_GET_ALL:
      return { ...state, loading: false, courses: action.payload, err: null };
    case COURSE_GET_ALL_FAILED:
      return { ...state, err: action.payload, loading: false, courses: [] };
    case COURSE_GET_BY_ID:
      return { ...state, course: action.payload, loading: false };
    case COURSE_GET_BY_ID_FAILED:
      return { ...state, course: {}, loading: false };
    case COURSE_ADD:
      return {
        ...state,
        course: [...state.course, action.payload],
        loading: false,
      };
    case COURSE_ADD_FAILED:
      return { ...state, loading: false };
    case COURSE_REMOVE:
      return {
        ...state,
        courses: state.courses.filter((e) => e._id !== action.payload),
        loading: false,
      };
    case COURSE_REMOVE_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
}
