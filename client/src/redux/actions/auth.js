import { SET_CURRENT_USER, LOGIN_FAILED, LOGIN_LOADING } from "./type";
import axios from "axios";
import setAuthToken from "../../common/setAuthToken";
import jwt_decode from "jwt-decode";
import { message } from "antd";

export const login = (userdata) => (dispatch) => {
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
