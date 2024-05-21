import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faHeadset,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  // getItem(<img src='/image/Logo.png' />, '0   '),
  getItem(<Link to={"/admin"}>Dashboard</Link>, "1", <DashboardOutlined />),
  getItem("Quản lý người dùng", "sub1", <UserOutlined />, [
    getItem(<Link to={"/admin/manager/user"}>Danh sách người dùng</Link>, "2"),
    getItem("Bill", "3"),
    getItem("Alex", "5"),
  ]),

  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const LayoutAdmin = () => {
  const {} = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        width={230}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical ps-3 mb-1">
          <img src="/image/Logo.png" className="w-32 mt-auto" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          className="p-0"
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            className="mt-4 mb-4"
            items={[
              {
                title: "Home",
              },
              {
                title: <a href="">Application Center</a>,
              },
              {
                title: <a href="">Application List</a>,
              },
              {
                title: "An Application",
              },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
