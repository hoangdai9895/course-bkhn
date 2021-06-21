import React, { useEffect } from "react";
import { Statistic, Card, Col, Row } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllCourse } from "../../redux/actions/course";
import { useDispatch, useSelector } from "react-redux";

export const Admin = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourse());
    // eslint-disable-next-line
  }, []);

  return (
    <Row gutter={5}>
      <Col xl={6}>
        <Card style={{ width: "100%" }}>
          <Statistic
            title="Number of course"
            value={course.length}
            prefix={
              <Link to="/course">
                <EditOutlined />
              </Link>
            }
          />
        </Card>
      </Col>
      <Col xl={6}>
        <Card style={{ width: "100%" }}>
          <Statistic
            title="Number of questions"
            value={112893}
            prefix={<EditOutlined />}
          />
        </Card>
      </Col>
      <Col xl={6}>
        <Card style={{ width: "100%" }}>
          <Statistic
            title="Number of student"
            value={112893}
            prefix={<EditOutlined />}
          />
        </Card>
      </Col>
      <Col xl={6}>
        <Card style={{ width: "100%" }}>
          <Statistic
            title="Number of categories"
            value={112893}
            prefix={<EditOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};
