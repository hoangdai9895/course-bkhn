import React, { useState, useEffect } from "react";
import { Input, Button, Col, Alert } from "antd";
import { Register } from "./Register";
import { login } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const LoginSceen = () => {
  const [visible, setvisible] = useState(false);
  const [userinfo, setuserinfo] = useState({ username: "", password: "" });
  const { loading, error, isAuthenticated, user:{role} } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const setInvisible = () => {
    setvisible(false);
  };
  const handleLogin = () => {
    dispatch(login(userinfo));
  };
  const onChange = (e) => {
    setuserinfo({ ...userinfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log(role)
      setTimeout(() => {
        role===2? history.push("/home"):  history.push("/dashboard");
      }, 1000);
    }
  }, [isAuthenticated]);
  return (
    <div className="login-main">
      <Col xl={16} className="login-form ">
        <h3 className="login-form__header">Sign In</h3>
        {error && error.trim() !== "" ? (
          <Alert
            message={error}
            type="error"
            closable
            style={{ marginBottom: "1rem" }}
          />
        ) : null}
        <Input
          size="large"
          placeholder="Username"
          name="username"
          onChange={onChange}
        />
        <Input.Password
          size="large"
          placeholder="Password"
          name="password"
          onChange={onChange}
        />
        <div>
          <Button
            type="primary"
            size="large"
            className="login__button"
            onClick={() => handleLogin()}
            loading={loading}
          >
            Login
          </Button>
          <span style={{ marginLeft: 10 }}>
            Don't have an account,
            <span className="login-redirect" onClick={() => setvisible(true)}>
              Sign Up
            </span>
            now
          </span>
        </div>
      </Col>
      <Register visible={visible} setInvisible={setInvisible} />
    </div>
  );
};
