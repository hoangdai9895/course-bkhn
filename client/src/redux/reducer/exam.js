import {
  SET_EXAM_LOADING,
  EXAM_GET_ALL,
  EXAM_GET_ALL_FAILED,
  EXAM_ADD_FAILED,
  EXAM_ADD,
  EXAM_REMOVE,
  EXAM_GET_BY_ID,
  EXAM_GET_BY_ID_FAILED,
  EXAM_REMOVE_FAILED,
} from "../actions/type";

const initialState = {
  loadingCourse: false,
  exames: [],
  err: null,
  loading: false,
  exam: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EXAM_LOADING:
      return { ...state, loading: true };
    case EXAM_GET_ALL:
      return { ...state, loading: false, exames: action.payload, err: null };
    case EXAM_GET_ALL_FAILED:
      return { ...state, err: action.payload, loading: false, exames: [] };
    case EXAM_GET_BY_ID:
      return { ...state, exam: action.payload, loading: false };
    case EXAM_GET_BY_ID_FAILED:
      return { ...state, exam: {}, loading: false };
    case EXAM_ADD:
      return {
        ...state,
        exam: [...state.exam, action.payload],
        loading: false,
      };
    case EXAM_ADD_FAILED:
      return { ...state, loading: false };
    case EXAM_REMOVE:
      return {
        ...state,
        exames: state.exames.filter((e) => e._id !== action.payload),
        loading: false,
      };
    case EXAM_REMOVE_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
}
