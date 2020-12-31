import React, { useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
	DesktopOutlined,
	UserOutlined,
	DashboardOutlined,
} from "@ant-design/icons";
import "../assets/styles/layout.scss";
import { logoutUser } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const LayoutWrapper = (props) => {
	const dispatch = useDispatch();
	const {
		user: { username },
	} = useSelector((state) => state.auth);
	const [collapsed, setcollapsed] = useState(false);
	const toggle = () => {
		setcollapsed(!collapsed);
	};

	const menu = (
		<Menu>
			<Menu.Item>
				<div onClick={() => dispatch(logoutUser())}>Log out</div>
			</Menu.Item>
		</Menu>
	);

	return (
		<Layout style={{ minHeight: "100vh" }} className="layout-main">
			{/* <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div
          className="main-layout-logo"
          style={{ justifyContent: collapsed ? "center" : "unset" }}
        >
          <DashboardOutlined style={{ marginRight: collapsed ? 0 : 10 }} />
          {!collapsed ? (
            <Link to="/dashboard" style={{ color: "#fff" }}>
              Dashboard
            </Link>
          ) : null}
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        </Menu>
      </Sider> */}

			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{ padding: 0 }}>
					<Dropdown overlay={menu} className="header-user">
						<a
							className="ant-dropdown-link"
							onClick={(e) => e.preventDefault()}>
							<img src="https://img.icons8.com/color/25/000000/user-male.png" />{" "}
							<div style={{ marginLeft: "10px", color: "#000" }}>
								Welcome {username}
							</div>
						</a>
					</Dropdown>
				</Header>
				<hr />
				<Content style={{ margin: "0 10px" }}>{props.children}</Content>

				<Footer style={{ textAlign: "center" }}>
					Ant Design ©{new Date().getFullYear()} Created by Dailch
				</Footer>
			</Layout>
		</Layout>
	);
};
