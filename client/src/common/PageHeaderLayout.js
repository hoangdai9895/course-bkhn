import React from "react";
import { PageHeader, Button, Typography, Row } from "antd";
import "../assets/styles/pageheader.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { Paragraph } = Typography;

const content = (text, isAdmin) => (
  <>
    <Paragraph>{text}</Paragraph>
    <div>
      {/* <Button key="3" style={{ marginRight: 10 }}>
        <Link to="/course">Courses</Link>
      </Button> */}
      <Button key="3" style={{ marginRight: 10 }}>
        <Link to="/exam">Exames</Link>
      </Button>
      {isAdmin ? (
        <Button key="2" style={{ marginRight: 10 }}>
          <Link to="/question">Questions</Link>
        </Button>
      ) : null}

      <Button key="1" style={{ marginRight: 10 }}>
        <Link to="/report">Reports</Link>
      </Button>
    </div>
  </>
);

const Content = ({ children, extraContent }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
};
export const PageHeaderLayout = ({ title, subtitle, text }) => {
  const { isAdmin } = useSelector((_) => _.auth);
  return (
    <PageHeader
      title={title}
      className="site-page-header"
      subTitle={subtitle}
      ghost={false}
    >
      <Content
        extraContent={
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
            alt="content"
            width="100px"
          />
        }
      >
        {content(text, isAdmin)}
      </Content>
    </PageHeader>
  );
};
