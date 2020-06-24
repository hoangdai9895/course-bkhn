import axios from "axios";
import {
  SET_RESULT_LOADING,
  RESULT_GET_ALL,
  RESULT_GAT_ALL_FAILED,
  RESULT_ADD_NEW,
  RESULT_ADD_NEW_FAILED,
} from "./type";

export const setResultLoading = () => ({
  type: SET_RESULT_LOADING,
});

export const getResults = () => (dispatch) => {
  dispatch(setResultLoading());
  axios
    .get("/api/result")
    .then((res) => {
      dispatch({
        type: RESULT_GET_ALL,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: RESULT_GAT_ALL_FAILED,
        payload: err,
      });
    });
};

export const createResult = (data) => (dispatch) => {
  axios
    .post("/api/result", data)
    .then((res) =>
      dispatch({
        type: RESULT_ADD_NEW,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: RESULT_ADD_NEW_FAILED,
        payload: err,
      })
    );
};
