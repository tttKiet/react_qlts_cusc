import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    UserOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    ClockCircleOutlined

} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faHeadset, faMessage } from '@fortawesome/free-solid-svg-icons';
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