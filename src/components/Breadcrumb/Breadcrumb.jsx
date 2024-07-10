import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    '/admin': 'Trang chủ',
    '/admin/user': 'Danh sách người dùng',
    '/admin/user/:id': 'Thông tin người dùng',
    '/admin/data': 'Danh sách dữ liệu',
    '/admin/data/:id': 'Thông tin khách hàng',
    '/admin/data/edit/:id': 'Chỉnh sửa thông tin',
    '/admin/add': 'Thêm dữ liệu',
    '/admin/segment': 'Phân đoạn dữ liệu',
    '/admin/division/:id': 'Chi tiết phân đoạn',
    '/admin/division': 'Phân chia dữ liệu',
    '/admin/thematic': 'Quản lý chuyên đề',
    '/admin/profile': 'Thông tin cá nhân',
    '/admin/user/detail': 'Chi tiết người dùng',
    '/admin/statistical': 'Thống kê',
    '/admin/statistical/day': 'Ngày',
    '/admin/statistical/contact': 'Liên hệ',
    '/admin/statistical/thematic': 'Chuyên đề',
    '/admin/file': 'Quản lý hồ sơ',
    '/usermanager': 'Trang chủ',
    '/usermanager/data': 'Danh sách dữ liệu',
    '/usermanager/data/:id': 'Chi tiết dữ liệu',
    '/usermanager/data/edit/:id': 'Chỉnh sửa thông tin',
    '/usermanager/thematic': 'Quản lý chuyên đề',
    '/usermanager/file': 'Quản lý hồ sơ',
};

const getBreadcrumbName = (pathname) => {
    const pathKeys = Object.keys(breadcrumbNameMap);
    for (let key of pathKeys) {
        const pathRegex = new RegExp(`^${key.replace(/:\w+/, '[^/]+')}$`);
        if (pathRegex.test(pathname)) {
            return breadcrumbNameMap[key];
        }
    }
    return null;
};

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const breadcrumbName = getBreadcrumbName(url) || url;

        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbName}</Link>
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
