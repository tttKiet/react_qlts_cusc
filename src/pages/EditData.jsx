import { faBullseye, faAddressCard, faClipboard, faUser, faArrowUpRightFromSquare, faPhone, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody, Divider, Tabs, Tab, Chip, Input, Button, Autocomplete, AutocompleteItem, Accordion, AccordionItem, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { Tag } from "antd";
import { useParams } from 'react-router-dom';
import useSWR from "swr";
import { API_CUSTOMER, API_DATA } from "../constants";
import { useEffect, useState } from "react";
import CustomerService from "../service/CustomerService";
import { toast } from "react-toastify";

function EditData() {

    const options = [
        { label: "Đồng ý", value: "Đồng ý" },
        { label: "Không đồng ý", value: "Không đồng ý" },
        { label: "Xem lại", value: "Xem lại" },
    ]

    const selectOther = [
        { label: "Công nghệ thông tin", value: "cntt" },
        { label: "Gần công nghệ thông tin", value: "gcntt" },
    ]

    const { id } = useParams();
    // API doituong
    const { data: dataThematic, mutate: fetchDataThematic } = useSWR(`${API_DATA}/table-thematic`);
    const { data: dataJob, mutate: fetchDataJob } = useSWR(`${API_DATA}/table-job`);
    // API phieudkxettuyen
    const { data: dataChannel, mutate: fetchDataChannel } = useSWR(`${API_DATA}/table-notification-channel`);
    const { data: dataCourse, mutate: fetchDataCourse } = useSWR(`${API_DATA}/table-course`);
    const { data: dataGraduation, mutate: fetchDataGraduation } = useSWR(`${API_DATA}/table-graduation`);
    const { data: dataJobRegister, mutate: fetchDataJobRegister } = useSWR(`${API_DATA}/table-majors`);
    console.log("dataGraduation", dataJobRegister)

    const { data: detailData, mutate } = useSWR(`${API_CUSTOMER}/${id}`)
    console.log(detailData)
    const [fullName, setFullName] = useState("")
    const [province, setProvince] = useState("")
    const [school, setSchool] = useState("")
    const [phone, setPhone] = useState("")
    const [phoneFather, setPhoneFather] = useState("")
    const [phoneMother, setPhoneMother] = useState("")
    const [faceBook, setFaceBook] = useState("")
    const [zalo, setZalo] = useState("")
    const [email, setEmail] = useState("")
    const [thematic, setThematic] = useState([])
    const [job, setJob] = useState("")
    const [option, setOption] = useState([])
    const [channel, setChannel] = useState("")
    const [course, setCourse] = useState()
    const [graduation, setGraduation] = useState("")
    const [jobRegister, setJobRegister] = useState("")
    const [typeJob, setTypeJob] = useState("")
    const [jobInput, setJobInput] = useState("")

    useEffect(() => {
        if (detailData) {
            setFullName(detailData?.HOTEN)
            setProvince(detailData?.tinh?.TENTINH)
            setSchool(detailData?.truong?.TENTRUONG)
            setPhone(detailData?.SDT)
            setPhoneFather(detailData?.dulieukhachhang?.SDTBA)
            setPhoneMother(detailData?.dulieukhachhang?.SDTME)
            setFaceBook(detailData?.dulieukhachhang?.FACEBOOK)
            setZalo(detailData?.dulieukhachhang?.SDTZALO)
            setEmail(detailData?.EMAIL)
            setThematic([detailData.chitietchuyende[0].MACHUYENDE] || "")
            setOption([detailData?.chitietchuyende[0].TRANGTHAI])
            setJob(detailData?.nghenghiep.MANGHENGHIEP)
            setChannel(detailData?.phieudkxettuyen.MAKENH)
            setCourse(`${detailData?.phieudkxettuyen.MALOAIKHOAHOC}`)
            setGraduation(`${detailData?.phieudkxettuyen.MAKETQUA}`)
            setJobRegister(detailData?.phieudkxettuyen.NGANHDK)
        }
    }, [detailData])

    useEffect(() => {
        console.log("course", course)
    }, [course])


    const contactDetails = [1, 2, 3].map(lan => {
        const contact = detailData?.lienhe.find(c => c.LAN == lan);
        return {
            LAN: lan,
            THOIGIAN: contact ? contact.THOIGIAN : 'Trống',
            CHITIETTRANGTHAI: contact ? contact.CHITIETTRANGTHAI : 'Trống',
            KETQUA: contact ? contact.KETQUA : 'Trống',
        };
    });



    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-medium",
        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
    };


    const handleUpdateInfo = async () => {
        try {
            const data = {
                customer: {
                    SDT: phone,
                    HOTEN: fullName,
                    EMAIL: email
                },
                data: {
                    SDTBA: phoneFather,
                    SDTME: phoneMother,
                    SDTZALO: zalo,
                    FACEBOOK: faceBook
                }
            }

            const res = await CustomerService.updateCustomer(data);
            mutate();
            toast.success(res.message)
        } catch (e) {
            toast.error(e.message)
        }
    }

    const handleUpdateObject = async () => {
        try {
            const data = {
                chuyendethamgia: {
                    SDT: phone,
                    TRANGTHAI: option,
                },
                nganhyeuthich: {

                }
            }

            const dataInfo = {
                customer: {
                    SDT: phone,
                    MANGHENGHIEP: job,
                },
                data: {

                }
            }

            const res = await CustomerService.updateObject(data);
            const resCustomer = await CustomerService.updateCustomer(dataInfo);
            if (res.statusCode === 200 && resCustomer.statusCode === 200) {
                mutate();
                toast.success("Cập nhật thông tin thành công")
            } else {
                toast.error("Cập nhật thất bại")
            }

        } catch (e) {
            toast.error(e.message)
        }
    }

    const handleUpdateRegister = async () => {
        try {
            if (jobRegister != "NG08") {
                const data = {
                    SDT: phone,
                    MALOAIKHOAHOC: course,
                    MAKENH: channel,
                    MAKETQUA: graduation,
                    NGANHDK: jobRegister
                }
                const res = await CustomerService.updateRegister(data);
                mutate();
                toast.success(res.message)
            } else {
                console.log("JobType", typeJob)
                console.log("jobInput", jobInput)
            }


        } catch (e) {
            toast.error(e.message)
        }
    }

    let tabs = [
        {
            id: "profile",
            label: "Thông tin cá nhân",
            content: (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Họ tên" value={fullName} variant="bordered"
                                onValueChange={setFullName} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Tỉnh" value={province}
                                onValueChange={setProvince} isDisabled />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Trường" value={school}
                                onValueChange={setSchool} isDisabled />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Số điện thoại" value={phone}
                                onValueChange={setPhone} isDisabled />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Số điện thoại ba" value={phoneFather || 'Trống'} variant="bordered"
                                onValueChange={setPhoneFather} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Số điện thoại mẹ" value={phoneMother || 'Trống'} variant="bordered"
                                onValueChange={setPhoneMother} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Facebook" value={faceBook || 'Trống'} variant="bordered"
                                onValueChange={setFaceBook} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Zalo" value={zalo || 'Trống'} variant="bordered"
                                onValueChange={setZalo} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Email" value={email} variant="bordered"
                                onValueChange={setEmail} />
                        </div>
                        <div className="col-span-2 md:col-span-1 flex items-end">
                            <Button color="primary" onClick={handleUpdateInfo}>Xác nhận</Button>
                        </div>
                    </div>
                </div>


            )
        },
        {
            id: "object",
            label: "Đối tượng",
            content: (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Select
                                items={dataThematic}
                                label="Chuyên đề tham gia"
                                variant="bordered"
                                labelPlacement="inside"
                                selectedKeys={thematic}
                                onChange={(e) => setThematic([e.target.value])}
                                classNames={{
                                    trigger: "h-12",
                                }}
                                renderValue={(items) => {
                                    return items.map((item) => (
                                        <div key={item.data.MACHUYENDE} className="flex items-center gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-default-500">{item.data.TENCHUYENDE} - Được quản lý bởi: {item.data.usermanager != null ? item.data.usermanager.HOTEN : 'Trống'}</span>
                                            </div>
                                        </div>
                                    ));
                                }}
                            >
                                {(thematic) => (
                                    <SelectItem key={thematic.MACHUYENDE} textValue={thematic.MACHUYENDE}>
                                        <div className="flex gap-2 items-center">
                                            <div className="flex flex-col">
                                                <span className="text-tiny text-default-400">{thematic.TENCHUYENDE} - Được quản lý bởi:  {thematic.usermanager != null ? thematic.usermanager.HOTEN : 'Trống'}</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                )}
                            </Select>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Select
                                label="Lựa chọn"
                                variant="bordered"
                                placeholder="Select an animal"
                                selectedKeys={option}

                                onChange={(e) => setOption([e.target.value])}
                            >
                                {options.map((option) => (
                                    <SelectItem key={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Nghề nghiệp"
                                variant="bordered"
                                selectedKey={job}
                                onSelectionChange={setJob}
                            >
                                {dataJob?.map((job) => (
                                    <AutocompleteItem key={job.MANGHENGHIEP} value={job.MANGHENGHIEP}>
                                        {job.TENNGHENGHIEP}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Hình thức thu thập" defaultValue={detailData?.hinhthucthuthap.TENHINHTHUC} isDisabled />
                        </div>
                    </div>
                    <div className=" mb-3">
                        <p>
                            Ngành yêu thích
                        </p>
                        <div className="mt-2">
                            {detailData?.nganhyeuthich.length != 0 ? detailData?.nganhyeuthich.map((job, index) => (
                                <Tag key={index} bordered={false} color="processing">
                                    {job?.nganh?.TENNGANH}
                                </Tag>
                            )) : 'Trống'}
                        </div>

                    </div>
                    <Button color="primary" onClick={handleUpdateObject}>Xác nhận</Button>
                </div>
            )
        },
        {
            id: "fromAdmission",
            label: "Phiếu đăng ký xét tuyển",
            content: (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Kênh nhận thông báo"

                                variant="bordered"
                                selectedKey={channel}
                                onSelectionChange={setChannel}
                            >
                                {dataChannel?.map((channel) => (
                                    <AutocompleteItem key={channel.MAKENH} value={channel.MAKENH}>
                                        {channel.TENKENH}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Khóa học quan tâm"

                                variant="bordered"
                                selectedKey={course}
                                onSelectionChange={setCourse}
                            >
                                {dataCourse?.map((course) => (
                                    <AutocompleteItem key={course.MALOAIKHOAHOC} value={course.MALOAIKHOAHOC}>
                                        {course.TENLOAIKHOAHOC}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Kết quả Cao đăng/Đại học"

                                variant="bordered"
                                selectedKey={graduation}
                                onSelectionChange={setGraduation}
                            >
                                {dataGraduation?.map((graduation) => (
                                    <AutocompleteItem key={graduation.MAKETQUA} value={graduation.MAKETQUA}>
                                        {graduation.KETQUA}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Accordion
                                showDivider={false}
                                className="flex flex-col gap-1 w-full"
                                itemClasses={itemClasses}
                            >
                                <AccordionItem
                                    key="1"
                                    aria-label="Hồ sơ"
                                    startContent={<FontAwesomeIcon size="lg" icon={faClipboardCheck} />}

                                    title="Hồ sơ"
                                >
                                    {detailData?.phieudkxettuyen.hoso > 0 ? detailData?.phieudkxettuyen.hoso : 'Chưa có thông tin'}
                                </AccordionItem>

                            </Accordion>
                        </div>

                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Ngành đăng ký"

                                variant="bordered"
                                selectedKey={jobRegister}
                                onSelectionChange={setJobRegister}
                            >
                                {dataJobRegister?.map((jobRegister) => (
                                    <AutocompleteItem key={jobRegister.MANGANH} value={jobRegister.MANGANH}>
                                        {jobRegister.TENNGANH}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        {jobRegister === 'NG08' ? (
                            <div className="col-span-2 md:col-span-1">
                                <Autocomplete
                                    label="Chọn loại ngành"
                                    variant="bordered"
                                    defaultItems={selectOther}

                                    selectedKey={typeJob}
                                    onSelectionChange={setTypeJob}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                </Autocomplete>
                            </div>
                        ) : ""}
                    </div>
                    {jobRegister === 'NG08' ? (
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="col-span-2 md:col-span-1">
                                <Input
                                    label="Tên ngành"
                                    variant="bordered"
                                    value={jobInput}
                                    onValueChange={setJobInput}
                                />
                            </div>

                        </div>
                    ) : ""}
                    <Button color="primary" onClick={handleUpdateRegister}>Xác nhận</Button>

                </div >
            )
        }
    ];
    let contacts = [
        {
            id: "contact1",
            label: "Liên hệ lần 1",
            content: (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <DatePicker label="Ngày liên hệ" className="max-w-[284px]" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Trạng thái"

                            >
                                {/* {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))} */}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Chi tiết trạng thái"

                            >
                                {/* {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))} */}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Kết quả" />
                        </div>
                    </div>
                    <Button color="primary">Xác nhận</Button>
                </div>
            )
        },
        {
            id: "contact2",
            label: "Liên hệ lần 2",
            content: (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <DatePicker label="Ngày liên hệ" className="max-w-[284px]" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Trạng thái"

                            >
                                {/* {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))} */}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Chi tiết trạng thái"

                            >
                                {/* {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))} */}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Kết quả" />
                        </div>
                    </div>
                    <Button color="primary">Xác nhận</Button>
                </div>
            )
        },
        {
            id: "contact3",
            label: "Liên hệ lần 3",
            content: (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <DatePicker label="Ngày liên hệ" className="max-w-[284px]" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Trạng thái"

                            >
                                {/* {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))} */}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Chi tiết trạng thái"

                            >
                                {/* {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))} */}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Kết quả" />
                        </div>
                    </div>
                    <Button color="primary">Xác nhận</Button>
                </div>
            )
        }
    ];



    return (
        <>
            <div className="">
                <div className="grid grid-cols-5 mt-4 gap-4">
                    <div className="col-span-5 md:col-span-3">
                        <Card>
                            <CardBody>
                                <Tabs aria-label="Dynamic tabs" items={tabs} variant="light">
                                    {(item) => (
                                        <Tab key={item.id} title={item.label}>
                                            <div>
                                                {item.content}
                                            </div>

                                        </Tab>
                                    )}
                                </Tabs>
                            </CardBody>
                        </Card>



                    </div>
                    <div className="col-span-5 md:col-span-2">
                        <Card>
                            <CardBody>
                                <Tabs aria-label="Dynamic tabs" items={contacts} variant="light">
                                    {(item) => (
                                        <Tab key={item.id} title={item.label}>
                                            <div>
                                                {item.content}
                                            </div>

                                        </Tab>
                                    )}
                                </Tabs>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div >


        </>
    );
}

export default EditData;