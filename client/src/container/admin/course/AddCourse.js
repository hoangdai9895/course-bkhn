import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Row,
  Col,
  Input,
  Select,
  Button,
  Divider,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import "../../../assets/styles/add-course.scss";
import { getAllQuestions } from "../../../redux/actions/question";
import { useDispatch, useSelector } from "react-redux";
import { AddNewQuestion } from "../question/AddNewQuestion";
import { addCourse } from "../../../redux/actions/course";
import { Link } from "react-router-dom";

export const AddCourse = (props) => {
  const dispatch = useDispatch();
  const [selectedAnswer, setselectedAnswer] = useState([]);
  const [visible, setvisible] = useState(false);
  const { questions, loadingQuestions } = useSelector(
    (state) => state.question
  );
  const {
    user: { id },
  } = useSelector((state) => state.auth);
  const filteredOptions = questions.filter((o) => !selectedAnswer.includes(o));
  const [course, setcourse] = useState({});
  const handleChange = (e) => {
    setselectedAnswer([...e]);
  };
  const onChange = (e) => {
    setcourse({ ...course, [e.target.name]: e.target.value });
  };

  const onCreate = () => {
    let newCourse = { ...course, questions: selectedAnswer, createdBy: id };
    if (newCourse.title === "") {
      message.error("Không được để trống tên bộ câu hỏi");
    } else if (newCourse.questions.length === 0) {
      message.error("Vui lòng chọn câu hỏi !");
    } else {
      dispatch(addCourse(newCourse));
    }
  };

  useEffect(() => {
    dispatch(getAllQuestions());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        extra={[
          <Link to="/course" key="3">
            <Button>Course</Button>
          </Link>,
          <Link to="/question" key="2">
            <Button>Question</Button>
          </Link>,
          <Link to="/report" key="1">
            <Button>Reports</Button>
          </Link>,
        ]}
        title="Add course"
        subTitle="Thêm bộ câu hỏi mới"
      />
      <Row gutter={16} style={{ background: "#fff", margin: "1rem 0" }}>
        <Col xl={24}>
          <div className="add-course-item">
            <div className="add-course-item__label">Tên bài trắc nghiệm</div>
            <div className="add-course-item__main">
              <TextArea
                placeholder="Bài trắc nghiệm thứ nhất !"
                autosize="true"
                name="title"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="add-course-item">
            <div className="add-course-item__label">Mô tả</div>
            <div className="add-course-item__main">
              <TextArea
                placeholder="Bài trắc nghiệm về ..."
                autosize="true"
                name="des"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="add-course-item">
            <div className="add-course-item__label">Thời gian</div>
            <div className="add-course-item__main">
              <Input
                placeholder="Nhập thời gian để hoàn thành bài trắc nghiệm (phút)"
                autosize="true"
                type="number"
                name="time"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="add-course-item">
            <div className="add-course-item__label">Danh sách câu hỏi</div>
            <div className="add-course-item__main">
              <Select
                loading={loadingQuestions}
                mode="multiple"
                placeholder="Chọn danh sách câu hỏi"
                value={selectedAnswer}
                onChange={handleChange}
                style={{ width: "100%" }}
                min={1}
                name="questions"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                    <Button
                      style={{ margin: "4px" }}
                      onClick={() => setvisible(true)}
                    >
                      <PlusOutlined /> Thêm câu hỏi mới
                    </Button>
                  </div>
                )}
              >
                {filteredOptions.map((e) => (
                  <Select.Option key={e._id} value={e._id}>
                    {e.question}
                  </Select.Option>
                ))}
              </Select>
              <AddNewQuestion visible={visible} setvisible={setvisible} />
            </div>
          </div>

          <div className="btn-add-course">
            <Button type="primary" onClick={onCreate}>
              Thêm mới
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
