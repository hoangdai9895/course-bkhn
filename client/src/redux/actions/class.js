import { notification } from "antd";
import axios from "axios";
import { buildApiUrl } from "../../utils/buildUrl";
import {
  ADD_CLASS,
  ADD_CLASS_FAILED,
  DELETE_CLASS,
  DELETE_CLASS_SUCCESS,
  GET_CLASS,
  GET_CLASS_BY_ID,
  GET_CLASS_BY_ID_FAILED,
  GET_CLASS_FAILED,
  SET_CLASS_LOADING,
  UPDATE_CLASS,
  UPDATE_CLASS_FAIELD,
} from "./type";

export const setClassLoading = () => ({
  type: SET_CLASS_LOADING,
});

// GET
export const getAllClass = (payload) => (dispatch) => {
  dispatch(setClassLoading());
  axios
    .get(`/api/class${buildApiUrl(payload)}`)
    .then((res) => {
      dispatch({
        type: GET_CLASS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CLASS_FAILED,
        payload: err,
      });
    });
};

// GET ID
export const getClassById = (id) => (dispatch) => {
  dispatch(setClassLoading());
  axios
    .get(`/api/class/${id}`)
    .then((res) => {
      dispatch({
        type: GET_CLASS_BY_ID,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CLASS_BY_ID_FAILED,
        payload: err,
      });
    });
};

//CREATE
export const createClass = (payload) => (dispatch) => {
  axios
    .post(`/api/class`, payload)
    .then((res) => {
      notification.success({
        message: "Thêm mới thành công!",
      });
      dispatch({
        type: ADD_CLASS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_CLASS_FAILED,
        payload: err,
      });
    });
};

// DELETE
export const deleteClass = (id) => (dispatch) => {
  axios
    .delete(`/api/class/${id}`)
    .then((res) => {
      notification.success({
        message: "Xóa thành công!",
      });
      dispatch({
        type: DELETE_CLASS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_CLASS_SUCCESS,
        payload: err,
      });
    });
};

// UPDATE
export const updateClass = (data) => (dispatch) => {
  axios
    .put(`/api/class/update`, data)
    .then((res) => {
      notification.success({
        message: "Cập nhật thành công!",
      });
      dispatch({
        type: UPDATE_CLASS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_CLASS_FAIELD,
        payload: err,
      });
    });
};
