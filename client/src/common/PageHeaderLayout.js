import React from "react";
import { PageHeader, Typography, Row } from "antd";
import "../assets/styles/pageheader.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const { Paragraph } = Typography;

const content = (text, isAdmin, isTeacher) => (
  <>
    <Paragraph>{text}</Paragraph>
    <div>
      <NavLink to="/exam" className="ant-btn" style={{ marginRight: 10 }}>
        Bài thi
      </NavLink>

      {(isAdmin || isTeacher) && (
        <>
          <NavLink
            to="/question"
            className="ant-btn"
            style={{ marginRight: 10 }}
          >
            Câu hỏi
          </NavLink>
          <NavLink
            to="/category"
            className="ant-btn"
            style={{ marginRight: 10 }}
          >
            Danh mục câu hỏi
          </NavLink>
          <NavLink to="/class" className="ant-btn" style={{ marginRight: 10 }}>
            Lớp
          </NavLink>
        </>
      )}
      {isAdmin && (
        <NavLink to="/users" className="ant-btn" style={{ marginRight: 10 }}>
          {/* Reports */}
          Thành viên
        </NavLink>
      )}

      <NavLink to="/report" className="ant-btn" style={{ marginRight: 10 }}>
        {/* Reports */}
        Kết quả
      </NavLink>
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
  const { isAdmin, isTeacher } = useSelector(({ auth }) => auth);

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
        {content(text, isAdmin, isTeacher)}
      </Content>
    </PageHeader>
  );
};
