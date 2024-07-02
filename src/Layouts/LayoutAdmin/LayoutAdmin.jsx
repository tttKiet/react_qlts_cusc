import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  Result,
  Space,
  theme,
} from "antd";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { Avatar } from "@nextui-org/react";
import { IconFile } from "@tabler/icons-react";
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
  getItem(
    <Link to={"/admin"}>Dashboard</Link>,
    "/admin",
    <DashboardOutlined />
  ),
  getItem("Quản lý người dùng", "sub1", <UserOutlined />, [
    getItem(
      <Link to={"/admin/user"}>Danh sách người dùng</Link>,
      "/admin/user"
    ),
  ]),
  getItem("Quản lý dữ liệu", "sub2", <DatabaseOutlined />, [
    getItem(<Link to={"/admin/data"}>Danh sách dữ liệu</Link>, "/admin/data"),
    getItem(<Link to={"/admin/add"}>Thêm dữ liệu</Link>, "/admin/add"),
    getItem(
      <Link to={"/admin/segment"}>Phân đoạn dữ liệu</Link>,
      "/admin/segment"
    ),
    getItem(
      <Link to={"/admin/division"}>Phân chia dữ liệu</Link>,
      "/admin/division"
    ),
  ]),
  getItem("Thống kê dữ liệu", "sub3", <DatabaseOutlined />, [
    getItem(
      <Link to={"/admin/statistical/day"}>Theo ngày</Link>,
      "/admin/statistical/day"
    ),
    getItem(
      <Link to={"/admin/statistical/contact"}>Theo liên hệ</Link>,
      "/admin/statistical/contact"
    ),
    getItem(
      <Link to={"/admin/statistical/thematic"}>Theo chuyên đề</Link>,
      "/admin/statistical/thematic"
    ),
  ]),
  getItem(
    <Link to={"/admin/time"}>Thời gian đăng nhập</Link>,
      <Link to={"/admin/statistical/thematic"}>Theo chuyên đề</Link>, 
      "/admin/statistical/thematic" 
    ),
  ]),
  getItem(
    <Link to={"/admin/time"}>Thời gian đăng nhập</Link>, 
    "/admin/time",
    <ClockCircleOutlined />
  ),
  getItem(
    <Link to={"/admin/thematic"}>Quản lý chuyên đề</Link>,
    "/admin/thematic",
    <FontAwesomeIcon icon={faClipboard} />
  ),
  getItem(
    <Link to={"/admin/file/manager"}>Quản lý hồ sơ</Link>,
    "/admin/file/manager",
    <IconFile size={16} />
  ),
];

const LayoutAdmin = () => {
  const { logout } = useAuth();

  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const { profile, isLoading } = useAuth();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // KIỂM TRA QUYỀN ĐĂNG NHẬP
  if (!isAuthenticated) {
    return (
      <div>
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link to={"/"} type="primary">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </div>
    );
  }
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
        <div className="demo-logo-vertical mb-1 flex">
          <img src="/image/CUSC_No_Background.png" className="w-20 ms-5" />
          {/* <h1 className='text-white text-lg font-bold'>HTQL Tuyển sinh</h1> */}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="p-0"
          onClick={handleClick}
          selectedKeys={[current]}
          items={items}
        />
      </Sider>

      <Layout
        style={{
          backgroundColor: "#F0F3F7",
        }}
      >
        <Header
          className="flex justify-end"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Dropdown
            className="flex items-center gap-2 me-5 cursor-pointer"
            menu={{
              items: [
                {
                  label: (
                    <div>
                      <UserOutlined /> Profile
                    </div>
                  ),
                  key: "0",
                },
                {
                  label: (
                    <div onClick={() => logout()}>
                      <LogoutOutlined /> Logout
                    </div>
                  ),
                  key: "1",
                },
              ],
            }}
            trigger={["click"]}
          >
            <div onClick={(e) => e.preventDefault()}>
              <Avatar
                isBordered
                color="primary"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              <div className="font-medium">
                <p className="text-sm">{user && user.HOTEN}</p>
                <p className="text-tiny text-gray-400">{user && user.ROLE}</p>
              </div>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumbs />
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
