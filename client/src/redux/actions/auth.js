import {
	SET_CURRENT_USER,
	LOGIN_FAILED,
	LOGIN_LOADING,
	REGISTER_FAILED,
	REGISTER_SUCCESS,
	GET_ALL_USER,
	GET_ALL_USER_FALIED,
	SET_USER_LOADING,
	UPDATE_USER_FAILED,
	UPDATE_USER,
	DELETE_USER,
	DELETE_USER_FAILED,
} from "./type";
import axios from "axios";
import setAuthToken from "../../common/setAuthToken";
import jwt_decode from "jwt-decode";
import { message, notification } from "antd";
import { buildApiUrl } from "../../utils/buildUrl";

export const register = (userdata) => (dispatch) => {
	dispatch(setLoginLoading());
	axios
		.post("/api/user/register", userdata)
		.then((res) => {
			console.log(res);
			notification.success({
				message: "Đăng ký tài khoản thành công",
			});
			dispatch({
				type: REGISTER_SUCCESS,
			});
		})
		.catch((err) => {
			console.log(err.response);
			message.error(err.response.data.err);
			dispatch({
				type: REGISTER_FAILED,
				payload: err.response.data.errUser,
			});
		});
};

export const login = (userdata) => (dispatch) => {
	dispatch(setLoginLoading());
	axios
		.post("/api/user/login", userdata)
		.then((res) => {
			// console.log(res);
			message.success(
				"Login successfully!, You will be redirected to homepage now!",
				1
			);
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) => {
			console.log(err.response);
			message.error(err.response.data.err);
			dispatch({
				type: LOGIN_FAILED,
				payload: err.response.data.errUser,
			});
		});
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};

export const setLoginLoading = () => ({
	type: LOGIN_LOADING,
});

export const setUserLoading = () => ({
	type: SET_USER_LOADING,
});

export const updateUser = (payload) => (dispatch) => {
	axios
		.put(`/api/user/update`, payload)
		.then((res) => {
			notification.success({
				message: "Cập nhật tài khoản thành công",
			});
			dispatch({
				type: UPDATE_USER,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: UPDATE_USER_FAILED,
				payload: err,
			});
		});
};

export const getAllUsers = (payload) => (dispatch) => {
	dispatch(setUserLoading());
	axios
		.get(`/api/user${buildApiUrl(payload)}`)
		.then((res) => {
			dispatch({
				type: GET_ALL_USER,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_USER_FALIED,
				payload: err,
			});
		});
};

// DELETE
export const deleteUser = (id) => (dispatch) => {
	axios
		.delete(`/api/user/${id}`)
		.then((res) => {
			notification.success({
				// TODO: chang text
				message: "Xoa tai khoan thanh cong",
			});
			dispatch({
				type: DELETE_USER,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: DELETE_USER_FAILED,
				payload: err,
			});
		});
};
