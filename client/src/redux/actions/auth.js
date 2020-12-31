import {
	SET_CURRENT_USER,
	LOGIN_FAILED,
	LOGIN_LOADING,
	REGISTER_FAILED,
	REGISTER_SUCCESS,
} from "./type";
import axios from "axios";
import setAuthToken from "../../common/setAuthToken";
import jwt_decode from "jwt-decode";
import { message } from "antd";

export const register = (userdata) => (dispatch) => {
	dispatch(setLoginLoading());
	axios
		.post("/api/user/register", userdata)
		.then((res) => {
			console.log(res);
			message.success("Register successfully!!", 1);
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
			message.error(err.response.data.errPassword);
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
