 
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
import { Button, Result } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faHeadset,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
 
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    UserOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    ClockCircleOutlined,
    LogoutOutlined

} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumb';
 
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
  const { profile, isLoading } = useAuth();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
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
          extra={<Button type="primary">Back Home</Button>}
        />
      </div>
    );
  }
 
    getItem(<Link to={"/admin"}>Dashboard</Link>, '/admin', <DashboardOutlined />),
    getItem('Quản lý người dùng', 'sub1', <UserOutlined />, [
        getItem(<Link to={"/admin/user"}>Danh sách người dùng</Link>, '/admin/user'),
        getItem('Bill', '3'),
        getItem('Alex', '4'),
    ]),
    getItem('Quản lý dữ liệu', 'sub2', <DatabaseOutlined />, [
        getItem(<Link to={"/admin/data"}>Danh sách dữ liệu</Link>, '/admin/data'),
        getItem(<Link to={"/admin/segment"}>Phân đoạn dữ liệu</Link>, '/admin/segment'),
        getItem(<Link to={"/admin/division"}>Phân chia dữ liệu</Link>, '/admin/division'),
    ]),
    getItem(<Link to={"/admin/time"}>Thời gian đăng nhập</Link>, '/admin/time', <ClockCircleOutlined />),
    getItem(<Link to={"/admin/thematic"}>Quản lý chuyên đề</Link>, '/admin/thematic', <FontAwesomeIcon icon={faClipboard} />),
    getItem(<Link >Đăng xuất</Link>, '10', <LogoutOutlined />),
];

const LayoutAdmin = () => {

    let location = useLocation();
    const [current, setCurrent] = useState(location.pathname);

    useEffect(() => {
        setCurrent(location.pathname);
    }, [location]);

    const handleClick = (e) => {
        setCurrent(e.key);
    };


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} width={230} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical mb-1 flex"  >
                    <img src='/image/CUSC_No_Background.png' className='w-20 ms-5' />
                    {/* <h1 className='text-white text-lg font-bold'>HTQL Tuyển sinh</h1> */}
                </div>
                <Menu theme="dark"
                    mode="inline" className='p-0' onClick={handleClick}
                    selectedKeys={[current]}

                    items={items}
                />
 

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
        >
          <div className="flex justify-center">
            {/* <div>MAADMIN: {profile?.MAADMIN}</div>
            <div>TENDANGNHAP: {profile?.TENDANGNHAP}</div> */}
          </div>
        </Header>
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
 
            <Layout>
                <Header
                    className='border-2'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                        backgroundColor: "#F0F3F7"
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
