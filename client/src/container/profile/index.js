import React from "react";
import { Form, Input, Button, message } from "antd";
import "../../assets/styles/profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/auth";

const Profile = () => {
  const { user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const { confirmPassword, newPassword } = values;
    if (confirmPassword !== newPassword) {
      message.error("Nhập lại mật khẩu mới chưa chính xác");
      return;
    }
    dispatch(updateUser({ ...values, username: user.username, _id: user.id }));
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
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng không để trống tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng không để trống email" },
            ]}
          >
            <Input />
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

export default Profile;
