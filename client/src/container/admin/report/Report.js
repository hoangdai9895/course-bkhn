import React, { useEffect } from "react";
import { Row, Col, Table, Pagination, Divider } from "antd";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
import { useSelector, useDispatch } from "react-redux";
import * as moment from "moment";
import { getResults } from "../../../redux/actions/result";
import { Link, useHistory, useLocation } from "react-router-dom";
import { buildApiUrl } from "../../../utils/buildUrl";
import querystring from "query-string";

export const Report = () => {
  // const { user } = useSelector((e) => e.auth);
  const { results, loadingResults, total } = useSelector(
    ({ result }) => result
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      render: (record, index, k) => <span>{k}</span>,
    },
    {
      title: "Bài thi",
      dataIndex: "exam",
      key: "exam",
      render: (e) => {
        if (!e?._id) {
          return "Bài thi đã bị xóa khỏi hệ thống";
        } else {
          return <Link to={`exam/take/${e?._id}`}>{e?.title}</Link>;
        }
      },
    },
    {
      title: "Cập nhật gần nhất",
      dataIndex: "last_update",
      key: "last_update",
      render: (e) => <span>{moment(e).format("DD-MM-YYYY HH:MM:SS")}</span>,
    },
    {
      title: "Ứng viên",
      dataIndex: "user",
      key: "user",
      render: (e) => <span>{e.username}</span>,
    },
    {
      title: "Kết quả",
      dataIndex: "result",
      key: "result",
    },
  ];

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
    dispatch(getResults(payload));
    // eslint-disable-next-line
  }, [location]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Kết quả"
          subtitle="Xin chào"
          //   text="View your report here !!!"
          text="Xem kết quả của bạn tại đây"
        />
      </Col>
      <Col xl={24}>
        <Table
          dataSource={results}
          columns={columns}
          loading={loadingResults}
          rowKey={(e) => e._id}
          pagination={false}
        />
        <Divider />
        <Pagination
          // current={+page || 1}
          current={+querystring.parse(location.search).page || 1}
          key={querystring.parse(location.search).page}
          total={total}
          onChange={handleSizeChange}
          onShowSizeChange={handleSizeChange}
        />
      </Col>
    </Row>
  );
};
