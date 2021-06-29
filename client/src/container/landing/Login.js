import React, { useState, useEffect } from "react";
import { Input, Button, Col, Alert, Form } from "antd";
import { Register } from "./Register";
import { login } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const LoginSceen = () => {
  const [visible, setvisible] = useState(false);
  const {
    loading,
    error,
    isAuthenticated,
    user: { role },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const setInvisible = () => {
    setvisible(false);
  };

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log(role);
      setTimeout(() => {
        role === 2 ? history.push("/home") : history.push("/exam");
      }, 1000);
    }
  }, [isAuthenticated, history, role]);
  return (
    <div className="login-main">
      <Col xl={16} className="login-form ">
        <h3 className="login-form__header">Đăng nhập</h3>
        {error && error.trim() !== "" ? (
          <Alert
            message={error}
            type="error"
            closable
            style={{ marginBottom: "1rem" }}
          />
        ) : null}
        <Form name="basic" onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Tài khoản" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Xác nhận
          </Button>
          <span style={{ marginLeft: 10 }}>
            Chưa có tài khoản,
            <span className="login-redirect" onClick={() => setvisible(true)}>
              Đăng ký
            </span>
            ngay
          </span>
        </Form>
      </Col>
      <Register visible={visible} setInvisible={setInvisible} />
    </div>
  );
};
