import { Button, Input, Radio, RadioGroup, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFiledIcon";
import { EyeFilledIcon } from "../icons/EyeFilledIcon ";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import yupService from "../yup/yupService";
function FormUser({ onClose, onSubmit, record, isEditUser }) {
    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityOther = () => setIsVisibleOther(!isVisibleOther);

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleOther, setIsVisibleOther] = useState(false);

    console.log(record)


    const roleUser = [
        { label: "Admin", value: "admin" },
        { label: "User Manager", value: "usermanager" },
    ]
    const genderUser = [
        { label: "Nam", value: "Nam" },
        { label: "Nữ", value: "Nữ" },
    ]

    const { register, handleSubmit, formState: { errors }, setValue, reset, unregister } = useForm({

        resolver: yupResolver(yupService.validateFromUser(isEditUser))
    });

    useEffect(() => {

    })

    useEffect(() => {
        if (Object.keys(record).length !== 0) {
            reset(record)
        }
    }, [record])

    const handleSubmitForm = (data) => {
        onSubmit(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="grid grid-cols-2 ">
                    <div className="groupInput mx-1">
                        <Input classNames={{ errorMessage: "text" }} {...register('fullName')}
                            isInvalid={errors.fullName?.message ? true : false} errorMessage={errors?.fullName?.message}
                            label="Họ và tên" isRequired={false} />
                    </div>
                    <div className="groupInput mx-1">
                        <Input {...register('email')} label="Email" isInvalid={errors.email?.message ? true : false}
                            errorMessage={errors?.email?.message} isRequired={false} />
                    </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                    <div className="groupInput mx-1">
                        <Input
                            label="Mật khẩu"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="max-w-xs"
                            {...register('password')}
                            isInvalid={errors.password?.message ? true : false} errorMessage={errors?.password?.message}
                        />
                    </div>
                    <div className="groupInput mx-1">
                        <Input
                            label="Nhập lại mật khẩu"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibilityOther}>
                                    {isVisibleOther ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisibleOther ? "text" : "password"}
                            className="max-w-xs"
                            // {...register('confirmPassword')}
                            {...(isEditUser ? {} : register('confirmPassword'))}
                            isInvalid={errors.confirmPassword?.message ? true : false} errorMessage={errors?.confirmPassword?.message}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                    <div className="groupInput mx-1">
                        <Select
                            label="Nhóm người dùng"
                            className="max-w-xs"
                            {...register('role')}
                            isInvalid={errors.role?.message ? true : false} errorMessage={errors?.role?.message}
                        >
                            {roleUser.map((role) => (
                                <SelectItem key={role.value} value={role.value}>
                                    {role.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="groupInput mx-1">
                        <Select
                            label="Nhóm giới tính"
                            className="max-w-xs"
                            {...register('gender')}
                            isInvalid={errors.gender?.message ? true : false} errorMessage={errors?.gender?.message}
                        >
                            {genderUser.map((gender) => (
                                <SelectItem key={gender.value} value={gender.value}>
                                    {gender.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                    <div className="groupInput mx-1">
                        <Input type="text" label="Số điện thoại" {...register('phone')}
                            isInvalid={errors.phone?.message ? true : false} errorMessage={errors?.phone?.message} />
                    </div>
                    <div className="groupInput mx-1">
                        <Input type="text" label="Địa chỉ"  {...register('address')}
                            isInvalid={errors.address?.message ? true : false} errorMessage={errors?.address?.message} />
                    </div>
                </div>
                <div className="flex flex-row justify-end py-2">
                    <Button color="danger" className="me-3" variant="light" onPress={onClose}>
                        Hủy
                    </Button>
                    <Button color="primary" type="submit">
                        {Object.keys(record).length === 0 ? 'Thêm' : 'Cập nhật'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FormUser;