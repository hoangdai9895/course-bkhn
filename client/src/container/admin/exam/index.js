import React, { useEffect } from "react";
import { Popconfirm, Table, Col, Row, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllExam, removeExam } from "../../../redux/actions/exam";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
import { Link } from "react-router-dom";
import * as moment from "moment";

export const Exam = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "Stt",
      key: "stt",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên bài thi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Số lượng câu hỏi",
      dataIndex: "length",
      key: "length",
      render: (text, record) => <span>{record.questions.length}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => (
        <span>{moment(text).format("DD-MM-YYYY HH:MM:SS")}</span>
      ),
    },
    {
      title: "Tạo bởi",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text, record) => <span>{record.createdBy.name}</span>,
    },
    {
      title: "Hành động",
      //   title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        if (isAdmin || isTeacher)
          return (
            <div style={{ display: "flex" }}>
              <Link
                to={`/exam/edit/${record._id}`}
                style={{ cursor: "pointer", marginRight: 10 }}
              >
                <EditOutlined />
              </Link>
              <div style={{ cursor: "pointer", marginRight: 10 }}>
                <Popconfirm
                  placement="topLeft"
                  title={"Bạn chắc chắn muốn xóa bộ câu hỏi này không ?"}
                  onConfirm={() => confirm(record._id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <DeleteOutlined />
                </Popconfirm>
              </div>
            </div>
          );
        return (
          <div style={{ cursor: "pointer" }}>
            <Link to={`exam/take/${record._id}`}>
              <PlayCircleOutlined />
            </Link>
          </div>
        );
      },
    },
  ];

  const confirm = (id) => {
    dispatch(removeExam(id));
  };

  const dispatch = useDispatch();

  const { loading, exams } = useSelector((state) => state.exam);

  const { isAdmin, isTeacher } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllExam());
    console.log(isAdmin);
    // eslint-disable-next-line
  }, []);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Bài thi"
          subtitle="Xin chào"
          // text="Exam list, chose one couse and complete or can create new one"
          text="Danh sách bài thi"
        />
      </Col>
      <Col xl={24}>
        {isAdmin || isTeacher ? (
          <Link to="/exam/add-new">
            <Button
              type="dashed"
              style={{ width: "100%", margin: "10px 0 10px 0" }}
            >
              <PlusCircleOutlined /> Tạo bài thi mới
            </Button>
          </Link>
        ) : null}

        <Table
          columns={columns}
          loading={loading}
          dataSource={exams}
          rowKey={(record) => record._id}
        />
      </Col>
    </Row>
  );
};
