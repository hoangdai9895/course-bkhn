import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popconfirm, Table, Button, Col, Row, Pagination, Divider } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  getAllQuestions,
  removeQuestion,
} from "../../../redux/actions/question";
import { AddNewQuestion } from "./AddNewQuestion";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
import { Updatequestion } from "./Updatequestion";
import querystring from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import { buildApiUrl } from "../../../utils/buildUrl";
import moment from "moment";

export const Question = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "Stt",
      key: "stt",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Câu hỏi",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Danh mục",
      dataIndex: "length",
      key: "length",
      render: (text, record) => <span>{record.category?.name}</span>,
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
      title: "Hành động",
      // title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <div style={{ cursor: "pointer", marginRight: 10 }}>
            <EditOutlined
              onClick={() => {
                setOpenUpdate(true);
                setUpdateId(record._id);
                console.log("22");
              }}
            />
          </div>
          <div>
            <Popconfirm
              placement="topLeft"
              title={"Bạn chắc chắn muốn xóa câu hỏi này không ?"}
              onConfirm={() => confirm(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const { loadingQuestions, questions, total } = useSelector(
    (state) => state.question
  );
  const [visible, setvisible] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateId, setUpdateId] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const confirm = (id) => {
    dispatch(removeQuestion(id));
  };

  const handleSizeChange = (page) => {
    const params = {
      page,
    };
    history.push(`${location.pathname}${buildApiUrl(params)}`);
  };

  useEffect(() => {
    const tmpPage = querystring.parse(location.search).page || 1;
    const payload = {
      page: tmpPage,
    };
    dispatch(getAllQuestions(payload));
  }, [location, dispatch]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Câu hỏi"
          subtitle="Xin chào"
          // text="Questions list, you can create, update or remove question"
          text="Danh sách câu hỏi"
        />
      </Col>
      <Col xl={24}>
        <Button
          type="dashed"
          style={{ width: "100%", margin: "10px 0 10px 0" }}
          onClick={() => setvisible(true)}
        >
          <PlusCircleOutlined /> Thêm mới câu hỏi
        </Button>
        <Table
          columns={columns}
          loading={loadingQuestions}
          dataSource={questions}
          rowKey={(record) => record._id}
          pagination={false}
        />
        <Divider />
        <Pagination
          current={+querystring.parse(location.search).page || 1}
          total={total}
          onChange={handleSizeChange}
          onShowSizeChange={handleSizeChange}
        />
      </Col>

      {/* add new modal */}
      <AddNewQuestion visible={visible} setvisible={setvisible} />
      <Updatequestion
        visible={openUpdate}
        setvisible={setOpenUpdate}
        id={updateId}
      />
    </Row>
  );
};
