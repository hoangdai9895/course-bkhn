import axios from "axios";
import {
	SET_CATEGORY_LOADING,
	CATEGORY_GET_ALL_FAILED,
	CATEGORY_GET_ALL,
	DELETE_CATEGORY,
	DELETE_CATEGORY_FAILED,
	CREATE_CATEGORY_FAILED,
	CREATE_CATEGORY,
	UPDATE_CATEGORY_FAILED,
	UPDATE_CATEGORY,
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

// DELETE
export const deleteCategory = (id) => (dispatch) => {
	axios
		.delete(`/api/category/${id}`)
		.then((res) => {
			dispatch({
				type: DELETE_CATEGORY,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: DELETE_CATEGORY_FAILED,
				payload: err,
			});
		});
};

// CREATE
export const createCategory = (data) => (dispatch) => {
	axios
		.post(`/api/category`, data)
		.then((res) => {
			dispatch({
				type: CREATE_CATEGORY,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: CREATE_CATEGORY_FAILED,
				payload: err,
			});
		});
};

// UPDATE
export const updateCategory = (data) => (dispatch) => {
	axios
		.put(`/api/category/update`, data)
		.then((res) => {
			dispatch({
				type: UPDATE_CATEGORY,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: UPDATE_CATEGORY_FAILED,
				payload: err,
			});
		});
};
