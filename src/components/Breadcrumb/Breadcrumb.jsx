import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    '/admin': 'Trang chủ',
    '/admin/manager': 'Quản lý',
    '/admin/manager/data': 'Danh sách dữ liệu',
    '/admin/manager/user': 'Danh sách người dùng',
    // Thêm các đường dẫn và tên tương ứng ở đây
};

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    return (
        <Breadcrumb className='mt-4 mb-4'>
            <Breadcrumb.Item key="home">
                {/* <Link to="/">Home</Link> */}
            </Breadcrumb.Item>
            {breadcrumbItems}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
