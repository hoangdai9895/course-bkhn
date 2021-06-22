import axios from "axios";
import {
	SET_EXAM_LOADING,
	EXAM_GET_ALL,
	EXAM_GET_ALL_FAILED,
	EXAM_ADD_FAILED,
	EXAM_ADD,
	EXAM_REMOVE,
	EXAM_REMOVE_FAILED,
	EXAM_GET_BY_ID,
	EXAM_GET_BY_ID_FAILED,
	UPDATE_EXAM,
	UPDATE_EXAM_FAILED,
} from "./type";
import { message } from "antd";

export const setExamLoading = () => ({
	type: SET_EXAM_LOADING,
});

export const getAllExam = () => (dispatch) => {
	dispatch(setExamLoading());
	axios
		.get(`/api/exam`)
		.then((res) => {
			dispatch({
				type: EXAM_GET_ALL,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: EXAM_GET_ALL_FAILED,
				payload: err,
			});
		});
};

export const getExamById = (id) => (dispatch) => {
	dispatch(setExamLoading());
	axios
		.get(`/api/exam/${id}`)
		.then((res) => {
			dispatch({
				type: EXAM_GET_BY_ID,
				payload: res.data[0],
			});
		})
		.catch((err) => {
			dispatch({
				type: EXAM_GET_BY_ID_FAILED,
				payload: err,
			});
		});
};

export const addExam = (exam) => (dispatch) => {
	dispatch(setExamLoading());
	axios
		.post("/api/exam", exam)
		.then((res) => {
			message.success("Thêm mới thành công !!");
			dispatch({
				type: EXAM_ADD,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: EXAM_ADD_FAILED,
				payload: err,
			});
		});
};

export const removeExam = (id) => (dispatch) => {
	dispatch(setExamLoading());
	axios
		.delete(`api/exam/${id}`)
		.then((res) => {
			if (res) {
				message.success("Xóa thành công !!");
				dispatch({
					type: EXAM_REMOVE,
					payload: res.data.id,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: EXAM_REMOVE_FAILED,
				payload: err,
			});
		});
};

export const updateExam = (data) => (dispatch) => {
	axios
		.patch(`/api/exam`, data)
		.then((res) => {
			if (res) {
				message.success("Cap nhat thành công !!");
				dispatch({
					type: UPDATE_EXAM,
					payload: res.data,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: UPDATE_EXAM_FAILED,
				payload: err,
			});
		});
};
