import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Button, DatePicker, Input, Textarea } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSWR from "swr";
import { API_DATA, API_USER } from "../../constants";
import yupService from "../yup/yupService";


import { getLocalTimeZone, today } from "@internationalized/date";

function FormThematic({ onClose, onSubmit }) {
    const { data: dataProvince, mutate } = useSWR(`${API_DATA}/province`);
    const [provinceSelected, setProvinceSelected] = useState('');
    const [urlSchool, setUrlSchool] = useState(`${API_DATA}/school`);
    const { data: listUserManager, mutate: fetchUserManager } = useSWR(`${API_USER}/user-manager`)
    useEffect(() => {
        if (provinceSelected) {
            setUrlSchool(`${API_DATA}/school?provinceCode=${provinceSelected}`);
        }
    }, [provinceSelected]);

    const { data: dataSchool } = useSWR(urlSchool);

    const [thematicName, setThematicName] = useState('');
    const [dateSelect, setDateSelect] = useState(null);

    const { register, handleSubmit, formState: { errors }, setValue, reset, unregister, control } = useForm({
        resolver: yupResolver(yupService.validateFormThematic)
    });

    useEffect(() => {
        if (dateSelect) {
            const formattedDate = dateSelect.toString();
            console.log(formattedDate)
            setValue('dateSelect', dateSelect);
        }
    }, [dateSelect, setValue]);

    const handleSubmitForm = (data) => {
        onSubmit(data)
        // console.log("Du lieu success", data)
        onClose()
    };
    return (
        <form id="form-thematic" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid grid-cols-2">
                <div className="col-span-2 md:col-span-1 mx-2">
                    <Input {...register('thematicName')} label="Tên chuyên đề"
                        isInvalid={errors.thematicName?.message ? true : false} errorMessage={errors?.thematicName?.message} isRequired={false} />
                </div>
                <div className="col-span-2 md:col-span-1 mx-2 mt-2 md:mt-0">
                    <Controller
                        name="dateSelect"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Thời gian tổ chức"
                                value={dateSelect}
                                onChange={(value) => {
                                    setDateSelect(value);
                                    field.onChange(value);
                                }}
                                isInvalid={errors.dateSelect ? true : false}
                                errorMessage={errors.dateSelect?.message}
                                isRequired={false}
                                minValue={today(getLocalTimeZone())}
                            />
                            // <Autocomplete
                            //     label="Chọn trường"
                            //     placeholder="Chọn trường"
                            //     isDisabled={!provinceSelected}
                            //     onSelectionChange={(value) => field.onChange(value)}
                            //     isInvalid={errors.school ? true : false}
                            //     errorMessage={errors.school?.message}
                            // >
                            //     {dataSchool?.map((school) => (
                            //         <AutocompleteItem key={school.MATRUONG} value={school.MATRUONG}>
                            //             {school.TENTRUONG}
                            //         </AutocompleteItem>
                            //     ))}
                            // </Autocomplete>
                        )}
                    />

                    {/* <DatePicker
                        label="Thời gian tổ chức"
                        value={dateSelect}
                        onChange={setDateSelect}
                        isInvalid={errors.dateSelect ? true : false}
                        errorMessage={errors.dateSelect?.message}
                        isRequired={false}
                        minValue={today(getLocalTimeZone())}
                    /> */}


                </div>
            </div>
            <div className="my-2 mx-2">
                <Textarea
                    label="Nội dung chuyên đề"
                    placeholder="Nhập nội dung chuyên đề"
                    {...register('thematicContent')}
                    classNames={{
                        base: "max-w-full",
                        input: "resize-y min-h-[40px]",
                    }}
                    disableAnimation
                    disableAutosize
                    isInvalid={errors.thematicContent ? true : false}
                    errorMessage={errors.thematicContent?.message}
                />
            </div>
            <div className="grid grid-cols-2">
                <div className="col-span-2 md:col-span-1 mx-2">
                    <Controller
                        name="province"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                label="Chọn tỉnh"
                                onSelectionChange={(value) => {
                                    setProvinceSelected(value);
                                    field.onChange(value);
                                }}
                                isInvalid={errors.province ? true : false}
                                errorMessage={errors.province?.message}
                            >
                                {dataProvince?.map((province) => (
                                    <AutocompleteItem key={province.MATINH} value={province.MATINH}>
                                        {province.TENTINH}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        )}
                    />
                </div>
                <div className="col-span-2 md:col-span-1 mx-2 mt-2 md:mt-0">
                    <Controller
                        name="school"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                label="Chọn trường"
                                placeholder="Chọn trường"
                                isDisabled={!provinceSelected}
                                onSelectionChange={(value) => field.onChange(value)}
                                isInvalid={errors.school ? true : false}
                                errorMessage={errors.school?.message}
                            >
                                {dataSchool?.map((school) => (
                                    <AutocompleteItem key={school.MATRUONG} value={school.MATRUONG}>
                                        {school.TENTRUONG}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        )}
                    />

                </div>
            </div>
            <div className="m-2">
                <Controller
                    name="usermanager"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            label="Chọn user manager"
                            onSelectionChange={(value) => field.onChange(value)}
                            isInvalid={errors.usermanager ? true : false}
                            errorMessage={errors.usermanager?.message}
                        >
                            {listUserManager?.map((usermanager) => (
                                <AutocompleteItem key={usermanager.SDT} value={usermanager.SDT}>
                                    {usermanager.usermanager.HOTEN}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    )}
                />
            </div>
            <div className="flex flex-row justify-end py-2">
                <Button color="danger" className="me-3" variant="light" onPress={onClose}>
                    Hủy
                </Button>
                <Button color="primary" type="submit">
                    Tạo
                </Button>
            </div>
        </form>

    );
}

export default FormThematic;
