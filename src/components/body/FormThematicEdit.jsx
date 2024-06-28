import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Button, DatePicker, Input, Textarea } from "@nextui-org/react";
import useSWR from "swr";
import { API_DATA, API_USER } from "../../constants";

import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

function FormThematicEdit({ onClose, onSubmit, record }) {
    console.log("record", record);

    // Khởi tạo URL để fetch danh sách trường
    const [urlSchool, setUrlSchool] = useState(`${API_DATA}/school`);
    const { data: dataProvince, mutate } = useSWR(`${API_DATA}/province`);
    const { data: dataSchool } = useSWR(urlSchool);

    // Lọc mã tỉnh từ dữ liệu record
    const provincedId = dataSchool?.filter((school) => school.MATRUONG === record?.tentruong);
    const provinceCode = provincedId && provincedId.length > 0 ? provincedId[0].MATINH : '';

    // Khởi tạo state
    const [provinceSelected, setProvinceSelected] = useState(provinceCode);
    const [schoolSelected, setSchoolSelected] = useState(record?.tentruong);
    const [dateSelected, setDateSelected] = useState(parseDate(record?.ngaythongbao));
    const [nameThematic, setNameThematic] = useState(record?.tenchuyende);
    const [usermanager, setUsermanager] = useState(record?.sdt);
    const [contentThematic, setContentThematic] = useState(record?.noidung);

    const { data: listUserManager, mutate: fetchUserManager } = useSWR(`${API_USER}/user-manager`);

    // Cập nhật URL để fetch danh sách trường khi tỉnh được chọn
    useEffect(() => {
        if (provinceSelected) {
            setUrlSchool(`${API_DATA}/school?provinceCode=${provinceSelected}`);
        }
    }, [provinceSelected]);

    const handleSubmitForm = () => {
        const data = {
            id: record?.id,
            ngaytochuc: dateSelected,
            noidung: contentThematic,
            sdt: usermanager,
            tenchuyende: nameThematic,
            tentruong: schoolSelected
        }
        onSubmit(data);
        onClose();
    };


    return (
        <>
            <div className="grid grid-cols-2">
                <div className="col-span-2 md:col-span-1 mx-2">
                    <Input
                        label="Tên chuyên đề"
                        value={nameThematic}
                        onValueChange={setNameThematic}

                    />
                </div>
                <div className="col-span-2 md:col-span-1 mx-2 mt-2 md:mt-0">
                    <DatePicker className="max-w-[284px]" label="Thời gian tổ chức" showMonthAndYearPickers
                        value={dateSelected} onChange={(value) => setDateSelected(value)} />
                </div>
            </div>
            <div className="my-2 mx-2">
                <Textarea
                    label="Nội dung chuyên đề"
                    placeholder="Nhập nội dung chuyên đề"
                    classNames={{
                        base: "max-w-full",
                        input: "resize-y min-h-[40px]",
                    }}
                    value={contentThematic}
                    onValueChange={setContentThematic}
                />
            </div>
            <div className="grid grid-cols-2">
                <div className="col-span-2 md:col-span-1 mx-2">
                    <Autocomplete
                        label="Chọn tỉnh"
                        selectedKey={provinceSelected}
                        onSelectionChange={setProvinceSelected}
                    >
                        {dataProvince?.map((province) => (
                            <AutocompleteItem key={province.MATINH} value={province.MATINH}>
                                {province.TENTINH}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>
                <div className="col-span-2 md:col-span-1 mx-2 mt-2 md:mt-0">
                    <Autocomplete
                        label="Chọn trường"
                        placeholder="Chọn trường"
                        selectedKey={schoolSelected}
                        onSelectionChange={setSchoolSelected}
                    >
                        {dataSchool?.map((school) => (
                            <AutocompleteItem key={school.MATRUONG} value={school.MATRUONG}>
                                {school.TENTRUONG}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>
            </div>
            <div className="m-2">
                <Autocomplete
                    label="Chọn user manager"
                    selectedKey={usermanager}
                    onSelectionChange={setUsermanager}
                >
                    {listUserManager?.map((usermanager) => (
                        <AutocompleteItem key={usermanager.SDT} value={usermanager.SDT}>
                            {usermanager.usermanager.HOTEN}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>
            <div className="flex flex-row justify-end py-2">
                <Button color="danger" className="me-3" variant="light" onPress={onClose}>
                    Hủy
                </Button>
                <Button color="primary" type="submit" onClick={handleSubmitForm}>
                    Cập nhật
                </Button>
            </div>
        </>
    );
}

export default FormThematicEdit;
