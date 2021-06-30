import {
  SET_CURRENT_USER,
  LOGIN_FAILED,
  LOGIN_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  GET_ALL_USER,
  GET_ALL_USER_FALIED,
  SET_USER_LOADING,
  UPDATE_USER,
  DELETE_USER,
  GET_ALL_STUDENT,
} from "../actions/type";

const initialState = {
  isAuthenticated: false,
  user: {},
  isAdmin: false,
  isTeacher: false,
  loading: false,
  registerStatus: false,
  error: "",
  users: [],
  total: 0,
  loadingUser: false,
  deleteStatus: false,
  students: [],
};

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return { ...state, loading: false };
    case REGISTER_FAILED:
      return { ...state, loading: false };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: action.payload.role === 0 ? true : false,
        isTeacher: action.payload.role === 1 ? true : false,
        loading: false,
        error: "",
      };
    case LOGIN_FAILED:
      return { ...state, loading: false, error: action.payload };

    case SET_USER_LOADING:
      return { ...state, loadingUser: true };

    case GET_ALL_USER:
      return {
        ...state,
        loadingUser: false,
        users: action.payload.data,
        total: action.payload.total,
        deleteStatus: false,
      };

    case GET_ALL_USER_FALIED:
      return { ...state, loadingUser: false };

    case UPDATE_USER:
      const newUser = state.users;
      newUser.forEach((e) => {
        if (e._id === action.payload.user._id) {
          e.role = action.payload.user.role;
          e.name = action.payload.user.name;
        }
      });
      return {
        ...state,
        users: [...newUser],
      };

    case DELETE_USER:
      return { ...state, deleteStatus: true };

    case GET_ALL_STUDENT:
      return { ...state, students: action.payload.data };
    default:
      return state;
  }
}
