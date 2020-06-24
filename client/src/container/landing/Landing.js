import React from "react";
import { Layout, Row, Col } from "antd";
import "../../assets/styles/landing.scss";
import { LoginSceen } from "./Login";

const { Content } = Layout;

export const Landing = () => {
  return (
    <Layout>
      <Content className="site-layout">
        <Row className="login">
          <Col xl={8} offset={4} className="login-intro">
            <h1>Learn From The Expert</h1>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br /> Maxime ipsa nulla sed quis rerum amet natus quas
              necessitatibus.
            </div>
          </Col>
          <Col xl={12}>
            <LoginSceen />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
