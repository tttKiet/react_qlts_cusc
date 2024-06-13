import { faBullseye, faAddressCard, faClipboard, faUser, faArrowUpRightFromSquare, faPhone, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody, Divider, Tabs, Tab, Chip, Input, Button, Autocomplete, AutocompleteItem, Accordion, AccordionItem, DatePicker } from "@nextui-org/react";
import { Tag } from "antd";
import { useParams } from 'react-router-dom';
import useSWR from "swr";
import { API_CUSTOMER } from "../constants";
import { useEffect, useState } from "react";

function EditData() {

    const { id } = useParams();

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

    useEffect(() => {
        if (detailData) {
            setFullName(detailData?.HOTEN)
            setProvince(detailData?.tinh?.TENTINH)
            setSchool(detailData?.truong?.TENTRUONG)
            setPhone(detailData?.SDT)
            setPhoneFather(detailData?.dulieukhachhang?.SDTBA)
            setPhoneMother(detailData?.dulieukhachhang?.SDTME)
            setFaceBook(detailData?.dulieukhachhang?.facebook)
            setZalo(detailData?.dulieukhachhang?.zalo)
            setEmail(detailData?.EMAIL)
        }
    }, [detailData])


    const contactDetails = [1, 2, 3].map(lan => {
        const contact = detailData?.lienhe.find(c => c.LAN == lan);
        return {
            LAN: lan,
            THOIGIAN: contact ? contact.THOIGIAN : 'Trống',
            CHITIETTRANGTHAI: contact ? contact.CHITIETTRANGTHAI : 'Trống',
            KETQUA: contact ? contact.KETQUA : 'Trống',
        };
    });

    const animals = [
        { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", value: "dog", description: "The most popular pet in the world" },
        { label: "Elephant", value: "elephant", description: "The largest land animal" },

    ]

    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-medium",
        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
    };

    console.log(contactDetails[0])

    let tabs = [
        {
            id: "profile",
            label: "Thông tin cá nhân",
            content: (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Họ tên" value={fullName}
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
                            <Input type="text" label="Số điện thoại ba" value={phoneFather}
                                onValueChange={setPhoneFather} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Số điện thoại mẹ" value={phoneMother}
                                onValueChange={setPhoneMother} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Facebook" value={faceBook}
                                onValueChange={setFaceBook} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Zalo" value={zalo}
                                onValueChange={setZalo} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Email" value={email}
                                onValueChange={setEmail} />
                        </div>
                        <div className="col-span-2 md:col-span-1 flex items-end">
                            <Button color="primary">Xác nhận</Button>
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
                            <Autocomplete
                                label="Chuyên đề tham gia"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Lựa chọn"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Nghề nghiệp"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input type="text" label="Hình thức thu thập" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Ngành đăng ký"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
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

                    </div>
                    <Button color="primary">Xác nhận</Button>
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
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Khóa học quan tâm"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Kết quả Cao đăng/Đại học"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
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
                                    Chưa có thông tin
                                </AccordionItem>

                            </Accordion>
                        </div>
                    </div>

                    <Button color="primary">Xác nhận</Button>
                </div>
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
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Chi tiết trạng thái"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
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
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Chi tiết trạng thái"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
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
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="col-span-2 md:col-span-1">
                            <Autocomplete
                                label="Chi tiết trạng thái"
                                className="max-w-xs"
                            >
                                {animals.map((animal) => (
                                    <AutocompleteItem key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </AutocompleteItem>
                                ))}
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
                <div className="grid grid-cols-2 mt-4 gap-4">
                    <div className="col-span-2 md:col-span-1">
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
                    <div className="col-span-2 md:col-span-1">
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