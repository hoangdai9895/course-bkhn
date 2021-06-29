import React from "react";
import { Form, Input, Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useDispatch, useSelector } from "react-redux";

import { Select } from "antd";
import { updateUser } from "../../../redux/actions/auth";

const { Option } = Select;

const UpdateUser = ({ setvisible, visible, id }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ auth }) =>
    auth.users.find((e) => e._id === id)
  );

  const onFinish = (values) => {
    if (!values.role) values.role = currentUser?.role;
    console.log(values);
    dispatch(
      updateUser({
        _id: id,
        ...values,
      })
    );
  };

  return (
    <Modal
      title="Cập nhật danh mục"
      visible={visible}
      onCancel={() => setvisible(false)}
      width={600}
      footer={null}
    >
      {currentUser && (
        <Form
          key={id}
          name="basic"
          onFinish={onFinish}
          initialValues={{ name: currentUser?.name }}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Tên",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role">
            <Select
              defaultValue={"" + currentUser?.role}
              style={{ width: "100%" }}
            >
              <Option value="0">Admin</Option>
              <Option value="1">Giáo viên</Option>
              <Option value="2">Học sinh</Option>
            </Select>
          </Form.Item>
          <div className="btn-group">
            <Button
              onClick={() => setvisible(false)}
              style={{ marginRight: 10 }}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default UpdateUser;
