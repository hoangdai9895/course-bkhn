import React from "react";
import { Layout, Menu, Dropdown } from "antd";
// import {
// 	DesktopOutlined,
// 	UserOutlined,
// 	DashboardOutlined,
// } from "@ant-design/icons";
import "../assets/styles/layout.scss";
import { logoutUser } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { menus } from "../constants/menus";
import logo from "../assets/imgs/l.svg";

const { Header, Content, Footer } = Layout;
// const { SubMenu } = Menu;

export const LayoutWrapper = (props) => {
  const dispatch = useDispatch();
  const {
    user: { username },
  } = useSelector((state) => state.auth);
  // const [collapsed, setcollapsed] = useState(false);
  // const toggle = () => {
  // 	setcollapsed(!collapsed);
  // };

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => dispatch(logoutUser())}>Đăng xuất</div>
      </Menu.Item>
    </Menu>
  );

  // useEffect(() => {
  // 	console.log(role);
  // }, [])

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-main">
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="main-header">
            <img src={logo} alt="" />
            <ul>
              {menus.map((e, i) => (
                <li key={i}>
                  <Link to={e.link}>{e.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Dropdown overlay={menu} className="header-user">
            <div
              href="#"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <img
                src="https://img.icons8.com/color/25/000000/user-male.png"
                alt="user"
              />{" "}
              <div style={{ marginLeft: "10px", color: "#000" }}>
                Xin chào {username}
              </div>
            </div>
          </Dropdown>
        </Header>
        <div className="bg-search">
          <div className="container">
            <div className="text" style={{ display: "none" }}>
              Search for anything
            </div>
            {/* <div className="input-wrap">
								<input placeholder="Course, Document,..."/>
							</div> */}
          </div>
        </div>
        <hr />
        <Content style={{ margin: "0 10px" }}>{props.children}</Content>

        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Dailch
        </Footer>
      </Layout>
    </Layout>
  );
};
