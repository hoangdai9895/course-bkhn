import React, { useEffect } from "react";
import { Form, Input, Button, PageHeader, Divider, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/auth";
import { createClass } from "../../../redux/actions/class";

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const AddClass = () => {
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} không được để trống!",
  };
  /* eslint-enable no-template-curly-in-string */

  const dispatch = useDispatch();
  const { users, loadingUser } = useSelector(({ auth }) => auth);

  const onFinish = (values) => {
    console.log(values);
    if (!values.teacher) values.teacher = users[0]._id || null;
    dispatch(createClass(values));
  };

  useEffect(() => {
    dispatch(getAllUsers({ role: 1 }));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Thêm lớp học"
        subTitle="Thêm lớp học mới"
      />

      <div style={{ background: "#fff", padding: "0 20px 20px 20px" }}>
        <Divider dashed style={{ marginTop: 0 }} />
        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          onFinish={onFinish}
          initialValues={{
            teacher: users[0]?._id,
          }}
        >
          <Form.Item name="name" label="Tên lớp" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="teacher" label="Giáo viên">
            <Select style={{ width: "100%" }} loading={loadingUser}>
              {users.map((e) => (
                <Option value={e?._id} key={e._id}>
                  {e?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddClass;
