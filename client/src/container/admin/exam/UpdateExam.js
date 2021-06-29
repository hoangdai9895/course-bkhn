import React, { useEffect, useState } from "react";
import {
  PageHeader,
  Row,
  Col,
  Input,
  Select,
  Button,
  Divider,
  message,
  Skeleton,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExamById } from "../../../redux/actions/exam";
import { PlusOutlined } from "@ant-design/icons";
import { getAllQuestions } from "../../../redux/actions/question";
import { AddNewQuestion } from "../question/AddNewQuestion";

import { updateExam } from "../../../redux/actions/exam";

const UpdateExam = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedAnswer, setselectedAnswer] = useState([]);
  const [visible, setvisible] = useState(false);
  const { exam, loading } = useSelector(({ exam }) => exam);
  const [examUpdate, setexam] = useState({});
  const { questions, loadingQuestions } = useSelector(
    ({ question }) => question
  );

  const onChange = (e) => {
    setexam({ ...examUpdate, [e.target.name]: e.target.value });
  };

  const onUpdate = () => {
    let data = {
      ...examUpdate,
      questions: selectedAnswer,
    };
    console.log(data);
    if (data.title === "") {
      message.error("Không được để trống tên bộ câu hỏi");
    } else if (data.questions.length === 0) {
      message.error("Vui lòng chọn câu hỏi !");
    } else {
      dispatch(updateExam(data));
    }
  };

  const handleChange = (e) => {
    setselectedAnswer([...e]);
  };

  useEffect(() => {
    exam && setselectedAnswer(exam?.questions?.map((e) => e._id));
    setexam(exam);
  }, [exam]);

  useEffect(() => {
    console.log(params);
    if (params?.id) dispatch(getExamById(params.id));
    // eslint-disable-next-line
  }, [params]);

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
          <Link to="/exam" key="3">
            <Button>Exam</Button>
          </Link>,
          <Link to="/question" key="2">
            <Button>Question</Button>
          </Link>,
          <Link to="/report" key="1">
            <Button>Reports</Button>
          </Link>,
        ]}
        title="Cập nhật bài thi"
        subTitle=""
      />

      {loading ? (
        <Skeleton />
      ) : (
        <Row gutter={16} style={{ background: "#fff", margin: "1rem 0" }}>
          <Col xl={24}>
            <div className="add-exam-item">
              <div className="add-exam-item__label">Tên bài trắc nghiệm</div>
              <div className="add-exam-item__main">
                <TextArea
                  placeholder="Bài trắc nghiệm thứ nhất !"
                  defaultValue={exam?.title}
                  autosize="true"
                  name="title"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="add-exam-item">
              <div className="add-exam-item__label">Mô tả</div>
              <div className="add-exam-item__main">
                <TextArea
                  placeholder="Bài trắc nghiệm về ..."
                  autosize="true"
                  defaultValue={exam?.des}
                  name="des"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="add-exam-item">
              <div className="add-exam-item__label">Thời gian</div>
              <div className="add-exam-item__main">
                <Input
                  placeholder="Nhập thời gian để hoàn thành bài trắc nghiệm (phút)"
                  autosize="true"
                  type="number"
                  defaultValue={exam?.time}
                  name="time"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="add-exam-item">
              <div className="add-exam-item__label">Danh sách câu hỏi</div>
              <div className="add-exam-item__main">
                <Select
                  loading={loadingQuestions}
                  mode="multiple"
                  placeholder="Chọn danh sách câu hỏi"
                  value={selectedAnswer}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  min={1}
                  name="questions"
                  filterOption={(input, option) => {
                    return (
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
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
                  {console.log(
                    questions.filter((o) => !selectedAnswer.includes(o))
                  )}
                  {questions
                    .filter((o) => !selectedAnswer.includes(o))
                    ?.map((e) => (
                      <Select.Option key={e._id} value={e._id}>
                        {e.question}
                      </Select.Option>
                    ))}
                </Select>
                <AddNewQuestion visible={visible} setvisible={setvisible} />
              </div>
            </div>

            <div className="btn-add-exam">
              <Button type="primary" onClick={onUpdate}>
                Lưu
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UpdateExam;
