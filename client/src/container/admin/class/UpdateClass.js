import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  PageHeader,
  Divider,
  Select,
  Skeleton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/auth";
import { useParams } from "react-router-dom";
import { getAllClass, updateClass } from "../../../redux/actions/class";
import { getAllExam } from "../../../redux/actions/exam";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UpdateClass = () => {
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} không được để trống!",
  };
  /* eslint-enable no-template-curly-in-string */

  const dispatch = useDispatch();
  const params = useParams();
  const [currentClass, setCurrentClass] = useState(null);
  const { users, loadingUser } = useSelector(({ auth }) => auth);
  const { exams, loadingCourse } = useSelector(({ exam }) => exam);
  const { classes, loadingClass } = useSelector((state) => state.class);

  const onFinish = (values) => {
    if (!values.teacher) values.teacher = users[0]._id || null;
    if (!values.exam) values.exam = exams[0]._id || null;
    values._id = currentClass?._id;
    console.log(values);
    dispatch(updateClass(values));
  };

  useEffect(() => {
    dispatch(getAllUsers({ role: 1 }));
    dispatch(getAllClass());
    dispatch(getAllExam());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    params?.id && setCurrentClass(classes.find((e) => e._id === params.id));
  }, [params, classes]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Cập nhật  lớp học"
        subTitle="Cập nhật thông tin lớp học"
      />
      <div style={{ background: "#fff", padding: "0 20px 20px 20px" }}>
        <Divider dashed style={{ marginTop: 0 }} />
        {currentClass ? (
          <Form
            {...layout}
            //   form={ form}
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onFinish}
            initialValues={{
              name: currentClass?.name,
              teacher: currentClass?.teacher._id,
              exam: currentClass?.exam?._id,
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

            <Form.Item name="exam" label="Bài thi trắc nghiệm">
              <Select style={{ width: "100%" }} loading={loadingCourse}>
                {exams.map((e) => (
                  <Option value={e?._id} key={e._id}>
                    {e?.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
};

export default UpdateClass;
