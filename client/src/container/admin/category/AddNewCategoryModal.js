import Modal from "antd/lib/modal/Modal";
import React from "react";
import { Form, Input, Button } from "antd";
import "../../../assets/styles/add-category.scss";
import { createCategory } from "../../../redux/actions/category";
import { useDispatch } from "react-redux";

const AddNewCategoryModal = ({ visible, setvisible }) => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    dispatch(createCategory(values));
  };

  return (
    <Modal
      title="Thêm mới danh mục"
      visible={visible}
      onCancel={() => setvisible(false)}
      width={600}
      footer={null}
    >
      <Form name="basic" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng điền tên danh mục",
            },
          ]}
        >
          <Input placeholder="Tên danh mục" />
        </Form.Item>
        <div className="btn-group">
          <Button onClick={() => setvisible(false)} style={{ marginRight: 10 }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddNewCategoryModal;
