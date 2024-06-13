import { faCircleUser, faEnvelope, faMarsAndVenus, faPersonHalfDress, faPhone, faUser, faUserGear, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Tab, Card, CardBody, CardHeader, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, RadioGroup, Radio, Textarea, Button, Chip } from "@nextui-org/react";
import { useState } from "react";
function ProfileAdmin() {
    const tabs = [
        {
            id: '1', label: 'Hoạt động', content:
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Tony Reichert</TableCell>
                            <TableCell>CEO</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Zoey Lang</TableCell>
                            <TableCell>Technical Lead</TableCell>
                            <TableCell>Paused</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Jane Fisher</TableCell>
                            <TableCell>Senior Developer</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>William Howard</TableCell>
                            <TableCell>Community Manager</TableCell>
                            <TableCell>Vacation</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
        },
        {
            id: '2', label: 'Cập nhật', content:
                <div className="flex flex-col gap-y-3">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input type="text" label="Họ tên" />
                        <Input type="email" label="Email" />
                    </div>
                    <div className="grid grid-cols-2">
                        <Input type="text" className="pe-2" label="Số điện thoại" isDisabled />
                        <RadioGroup className="ms-2"

                            label="Giới tính"
                            orientation="horizontal"
                        >
                            <Radio value="buenos-aires">Nam</Radio>
                            <Radio value="sydney">Nữ</Radio>

                        </RadioGroup>
                    </div>
                    <div>
                        <Textarea
                            label="Địa chỉ"
                            className="w-full"
                        />
                    </div>
                    <Button color="primary" className="flex ms-auto">
                        Button
                    </Button>
                </div>


        },
        {
            id: '3', label: 'Mật khẩu', content:
                <div className="flex flex-col gap-y-3">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input type="email" label="Email" />
                        <Input type="email" label="Email" placeholder="Enter your email" />
                    </div>
                    <div className="grid grid-cols-2">
                        <Input className="pe-2" type="email" label="Email" />
                    </div>
                    <div className="flex justify-end">
                        <Button color="primary">Xác nhận</Button>
                    </div>

                </div>
        },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].id);


    return (
        <>
            <div>

                <div className="border-1 bg-white rounded-lg">
                    <div className="rounded-t-lg h-40 overflow-hidden relative">
                        <img
                            className="object-cover object-top w-full h-full filter brightness-75"
                            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                            alt="Mountain"
                        />
                    </div>


                    <div className="relative -mt-24 flex items-center ms-5">
                        <div className="w-32 h-32 relative border-4 border-white rounded-full overflow-hidden">
                            <img
                                className="object-cover object-center h-full w-full"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                                alt="Woman looking front"
                            />
                        </div>
                        <div className="ml-4">
                            <h2 className="font-bold text-2xl text-white">Sarah Smith</h2>
                            <p className="text-white font-medium">ADMIN</p>
                        </div>
                    </div>
                    <div className="flex w-full flex-row justify-end pb-2">
                        <Tabs className="me-5"
                            aria-label="Dynamic tabs"
                            onSelectionChange={(id) => setActiveTab(id)}
                            variant="light"
                        >
                            {tabs.map((item) => (
                                <Tab key={item.id} title={item.label}>
                                </Tab>
                            ))}
                        </Tabs>
                    </div>

                </div>
                <div className="mt-3 grid grid-cols-3" >
                    <div className="col-span-3 md:col-span-1">
                        <Card className="max-w-[400px] rounded-lg">
                            <CardHeader>
                                <h1 className='font-bold text-lg'>Thông tin cá nhân</h1>
                            </CardHeader>
                            <Divider />
                            <CardBody className="gap-y-2 text-base">
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faUser} />
                                        <p className="font-medium ms-1">Họ tên:</p>
                                    </div>
                                    <p className="ms-auto font-medium">Trần Hoàng Trân</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faMarsAndVenus} />
                                        <p className="font-medium">Giới tính:</p>
                                    </div>
                                    <p className="ms-auto font-medium">Nam</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faPhone} />
                                        <p className="font-medium">SĐT:</p>
                                    </div>
                                    <p className="ms-auto font-medium">0971144857</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <p className="font-medium">Email:</p>
                                    </div>
                                    <p className="ms-auto font-medium">tranhoangtran22225@gmail.com</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faCircleUser} />
                                        <p className="font-medium">Tên đăng nhập:</p>
                                    </div>
                                    <p className="ms-auto font-medium">0971144857</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faUserGear} />
                                        <p className="font-medium">Vai trò:</p>
                                    </div>
                                    <Chip
                                        className="ms-auto"
                                        variant="flat"
                                        color="primary"
                                    >
                                        Admin
                                    </Chip>
                                </div>
                            </CardBody>
                            <Divider />
                        </Card>
                    </div>
                    <div className="col-span-3 md:col-span-2" style={{
                        padding: "10px",
                        background: "#fff",
                        borderRadius: "10px"
                    }}>
                        {tabs.map((item) => (
                            item.id === activeTab && (
                                <div key={item.id}>
                                    <div>
                                        {item.content}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProfileAdmin;