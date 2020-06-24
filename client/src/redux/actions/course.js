import axios from "axios";
import {
  SET_COURSE_LOADING,
  COURSE_GET_ALL,
  COURSE_GET_ALL_FAILED,
  COURSE_ADD_FAILED,
  COURSE_ADD,
  COURSE_REMOVE,
  COURSE_REMOVE_FAILED,
  COURSE_GET_BY_ID,
  COURSE_GET_BY_ID_FAILED,
} from "./type";
import { message } from "antd";

export const setCourseLoading = () => ({
  type: SET_COURSE_LOADING,
});

export const getAllCourse = () => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .get(`/api/course`)
    .then((res) => {
      dispatch({
        type: COURSE_GET_ALL,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_GET_ALL_FAILED,
        payload: err,
      });
    });
};

export const getCourseById = (id) => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .get(`/api/course/${id}`)
    .then((res) => {
      dispatch({
        type: COURSE_GET_BY_ID,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_GET_BY_ID_FAILED,
        payload: err,
      });
    });
};

export const addCourse = (course) => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .post("/api/course", course)
    .then((res) => {
      message.success("Thêm mới thành công !!");
      dispatch({
        type: COURSE_ADD,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: COURSE_ADD_FAILED,
        payload: err,
      });
    });
};

export const removeCourse = (id) => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .delete(`api/course/${id}`)
    .then((res) => {
      if (res) {
        message.success("Xóa thành công !!");
        dispatch({
          type: COURSE_REMOVE,
          payload: res.data.id,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: COURSE_REMOVE_FAILED,
        payload: err,
      });
    });
};
