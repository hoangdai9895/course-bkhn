import axios from "axios";
import {
  SET_CATEGORY_LOADING,
  CATEGORY_GET_ALL_FAILED,
  CATEGORY_GET_ALL,
} from "./type";

export const setCategoryLoading = () => ({
  type: SET_CATEGORY_LOADING,
});

export const getAllCategories = () => (dispatch) => {
  dispatch(setCategoryLoading());
  axios
    .get("/api/category")
    .then((res) => {
      dispatch({
        type: CATEGORY_GET_ALL,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CATEGORY_GET_ALL_FAILED,
        payload: err,
      });
    });
};
