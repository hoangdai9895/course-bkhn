import React from "react";
import { Row, Col } from "antd";
import { PageHeaderLayout } from "../../common/PageHeaderLayout";
import { useSelector } from "react-redux";
import { Admin } from "../dashboard/Admin";
import { User } from "../dashboard/User";

export const Dashboard = () => {
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Dashboard"
          subtitle="Xin chào"
          text="Here is the main page"
        />
      </Col>
      <Col xl={24}>{role === 0 ? <Admin /> : <User />}</Col>
    </Row>
  );
};
