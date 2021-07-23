import React from "react";
import { Form, Input, Button, message } from "antd";
import "../../assets/styles/profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../redux/actions/auth";

const ChangePassword = () => {
  const { user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const { confirmPassword, newPassword } = values;
    if (confirmPassword !== newPassword) {
      message.error("Nhập lại mật khẩu mới chưa chính xác");
      return;
    }
    dispatch(
      updateUserInfo({ ...values, username: user.username, _id: user.id })
    );
  };

  return (
    <div className="container">
      <div className="content">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={user}
          onFinish={onFinish}
        >
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhập mật khẩu mới" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhập mật khẩu mới" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
