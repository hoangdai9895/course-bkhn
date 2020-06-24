import axios from "axios";
import {
  SET_QUESTION_LOADING,
  QUESTION_ADD_NEW_FAILED,
  QUESTION_GET_ALL,
  QUESTION_GET_ALL_FAILED,
  QUESTION_ADD_NEW,
  QUESTION_REMOVE,
  QUESTION_REMOVE_FAILED,
} from "./type";
import { message } from "antd";

export const setQuestionLoading = () => ({
  type: SET_QUESTION_LOADING,
});

export const getAllQuestions = () => (dispatch) => {
  dispatch(setQuestionLoading());
  axios
    .get("/api/question")
    .then((res) => {
      dispatch({
        type: QUESTION_GET_ALL,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: QUESTION_GET_ALL_FAILED,
        payload: err,
      });
    });
};

export const addNewQuestion = (data) => (dispatch) => {
  dispatch(setQuestionLoading());
  axios
    .post("/api/question", data)
    .then((res) => {
      message.success("Add new succesfully!!");
      dispatch({
        type: QUESTION_ADD_NEW,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: QUESTION_ADD_NEW_FAILED,
        payload: err,
      });
    });
};

export const removeQuestion = (id) => (dispatch) => {
  axios
    .delete(`/api/question/${id}`)
    .then((res) => {
      message.success("Xóa thành công");
      dispatch({
        type: QUESTION_REMOVE,
        payload: id,
      });
    })
    .catch((err) => {
      message.error("Xóa thất bại");
      dispatch({
        type: QUESTION_REMOVE_FAILED,
        payload: err,
      });
    });
};
