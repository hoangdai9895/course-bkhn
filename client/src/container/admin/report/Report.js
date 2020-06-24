import React, { useEffect } from "react";
import { Row, Col, Table } from "antd";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
import { useSelector, useDispatch } from "react-redux";
import * as moment from "moment";
import { getResults } from "../../../redux/actions/result";
import { Link } from "react-router-dom";

export const Report = () => {
  const { user } = useSelector((e) => e.auth);
  const { results, loadingResults } = useSelector((e) => e.result);

  const dispatch = useDispatch();

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      render: (record, index, k) => <span>{k}</span>,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (e) => <Link to={`course/${e._id}`}>{e.title}</Link>,
    },
    {
      title: "Last update",
      dataIndex: "last_update",
      key: "last_update",
      render: (e) => (
        <span>{moment(e.last_update).format("DD-MM-YYYY HH:MM:SS")}</span>
      ),
    },
    {
      title: "Candidate",
      dataIndex: "user",
      key: "user",
      render: (e) => <span>{e.username}</span>,
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
    },
  ];

  useEffect(() => {
    dispatch(getResults());
  }, []);
  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Report"
          subtitle="Welcome"
          text="View your report here !!!"
        />
      </Col>
      <Col xl={24}>
        <Table
          dataSource={results}
          columns={columns}
          loading={loadingResults}
          rowKey={(e) => e._id}
        />
        ;
      </Col>
    </Row>
  );
};
