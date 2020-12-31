import React, { useEffect } from "react";
import { Popconfirm, Table, Col, Row, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse, removeCourse } from "../../../redux/actions/course";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
import { Link } from "react-router-dom";
import * as moment from "moment";
export const Course = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "Stt",
      key: "stt",
      render: (text, record) => <span>{record._id}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Number of question",
      dataIndex: "length",
      key: "length",
      render: (text, record) => <span>{record.questions.length}</span>,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => (
        <span>{moment(text).format("DD-MM-YYYY HH:MM:SS")}</span>
      ),
    },
    {
      title: "Created by",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text, record) => <span>{record.createdBy.name}</span>,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        if (isAdmin)
          return (
            <div style={{ display: "flex" }}>
              <div style={{ cursor: "pointer", marginRight: 10 }}>
                <EditOutlined />
              </div>
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
            <Link to={`course/${record._id}`}>
              <PlayCircleOutlined />
            </Link>
          </div>
        );
      },
    },
  ];

  const confirm = (id) => {
    dispatch(removeCourse(id));
  };
  const dispatch = useDispatch();
  const { loading, courses } = useSelector((state) => state.course);
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllCourse());
    console.log(isAdmin)
  }, []);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Course"
          subtitle="Welcome"
          text="Course list, chose one couse and complete or can create new one"
        />
      </Col>
      <Col xl={24}>
        {
          isAdmin ? (<Link to="/course/add-new">
          <Button
            type="dashed"
            style={{ width: "100%", margin: "10px 0 10px 0" }}
          >
            <PlusCircleOutlined /> Add new course
          </Button>
        </Link>) :null
        }
        
        <Table
          columns={columns}
          loading={loading}
          dataSource={courses}
          rowKey={(record) => record._id}
        />
      </Col>
    </Row>
  );
};
