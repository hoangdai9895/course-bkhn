import {
  SET_CATEGORY_LOADING,
  CATEGORY_GET_ALL,
  CATEGORY_GET_ALL_FAILED,
} from "../actions/type";

const initialState = {
  loadingCategory: false,
  categories: [],
  err: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY_LOADING:
      return { ...state, loadingCategory: true };
    case CATEGORY_GET_ALL:
      return {
        ...state,
        loadingCategory: false,
        categories: action.payload,
        err: null,
      };
    case CATEGORY_GET_ALL_FAILED:
      return {
        ...state,
        err: action.payload,
        loadingCategory: false,
        categories: [],
      };
    default:
      return state;
  }
}
