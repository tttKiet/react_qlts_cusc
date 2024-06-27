import yup from "../Validation/Validate";

const validateFromUser = (isEditUser) => {
    return yup.object().shape({
        fullName: yup
            .string()
            .required('Vui lòng nhập họ tên'),
        email: yup
            .string()
            .required('Vui lòng nhập email').email('Email sai định dạng'),
        password:
            isEditUser ? yup.string().notRequired()
                : yup.string().required('Vui lòng nhập mật khẩu'),
        confirmPassword:
            isEditUser ? yup.string().notRequired()
                : yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
        role: yup
            .string()
            .required('Vui lòng chọn nhóm người dùng'),
        gender: yup
            .string()
            .required('Vui lòng chọn giới tính'),
        phone: yup
            .string()
            .required('Vui lòng nhập số điện thoại').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Số điện thoại không đúng định dạng'),
        address: yup
            .string()
            .required('Vui lòng nhập địa chỉ'),

    })
}

const validateFormThematic = yup.object().shape({
    thematicName: yup
        .string()
        .required('Vui lòng nhập tên chuyên đề'),

    dateSelect: yup
        .string()
        .required('Vui lòng chọn ngày tổ chức'),
    thematicContent: yup
        .string()
        .required('Vui lòng nhập nội dung'),
    province: yup
        .string()
        .required('Vui lòng chọn tỉnh'),
    school: yup
        .string()
        .required('Vui lòng chọn trường'),
    usermanager: yup
        .string()
        .required('Vui lòng chọn usermanager'),
});

export default {
    validateFromUser,
    validateFormThematic,
}