import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    UserOutlined,
    DashboardOutlined,
    DatabaseOutlined

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
        getItem(<Link to={"/admin/manager/user"}>Danh sách người dùng</Link>, '/admin/manager/user'),
        getItem('Bill', '3'),
        getItem('Alex', '4'),
    ]),

    getItem('Quản lý dữ liệu', 'sub2', <DatabaseOutlined />, [
        getItem(<Link to={"/admin/manager/data"}>Danh sách người dùng</Link>, '/admin/manager/data'),
    ]),
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
                <div className="demo-logo-vertical ps-3 mb-1"  >
                    <img src='/image/Logo.png' className='w-32 mt-auto' />
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
                    {/* <Breadcrumb className='mt-4 mb-4'
                        items={[
                            {
                                title: 'Home',
                            },
                            {
                                title: <a href="">Application Center</a>,
                            },
                            {
                                title: <a href="">Application List</a>,
                            },
                            {
                                title: 'An Application',
                            },
                        ]}
                    /> */}
                    <Breadcrumbs />
                    <div
                    // style={{
                    //     padding: 24,
                    //     minHeight: 360,
                    //     background: colorBgContainer,
                    //     borderRadius: borderRadiusLG,
                    // }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayoutAdmin;