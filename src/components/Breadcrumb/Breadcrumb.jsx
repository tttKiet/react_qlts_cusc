import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    '/admin': 'Trang chủ',
    '/admin/user': 'Danh sách người dùng',
    '/admin/data': 'Danh sách dữ liệu',
    '/admin/segment': 'Phân đoạn dữ liệu',
    '/admin/division': 'Phân chia dữ liệu',
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
        <Breadcrumb className='mt-4 mb-4' items={{ breadcrumbNameMap }}>
            {breadcrumbItems}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
