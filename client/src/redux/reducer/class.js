import {
  ADD_CLASS,
  DELETE_CLASS,
  GET_CLASS,
  GET_CLASS_BY_ID,
  GET_CLASS_BY_ID_FAILED,
  GET_CLASS_FAILED,
  LOAD_CLASS,
  SET_CLASS_LOADING,
} from "../actions/type";

const initialState = {
  loadingClass: false,
  classes: [],
  err: null,
  total: 0,
  deleteStatus: false,
  currentClass: {},
  loadingClassId: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CLASS_LOADING:
      return { ...state, loadingClass: true };

    case GET_CLASS:
      return {
        ...state,
        loadingClass: false,
        classes: action.payload?.data,
        total: action.payload?.total,
        err: null,
        deleteStatus: false,
      };

    case GET_CLASS_FAILED:
      return {
        ...state,
        err: action.payload,
        loadingClass: false,
        classes: [],
      };

    case ADD_CLASS:
      return { ...state, classes: [...state.classes, action.payload] };

    case DELETE_CLASS:
      return { ...state, deleteStatus: true };

    case GET_CLASS_BY_ID:
      return {
        ...state,
        currentClass: action.payload.data[0],
        loadingClassId: false,
      };

    case GET_CLASS_BY_ID_FAILED:
      return {
        ...state,
        loadingClassId: false,
      };

    case LOAD_CLASS:
      return { ...state, loadingClassId: true };

    default:
      return state;
  }
}
