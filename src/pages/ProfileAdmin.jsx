import { faCircleUser, faEnvelope, faMarsAndVenus, faPersonHalfDress, faPhone, faUser, faUserGear, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Tab, Card, CardBody, CardHeader, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, RadioGroup, Radio, Textarea, Button, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR, { useSWRConfig } from "swr";
import { API_USER } from "../constants";
import { toast } from "react-toastify";
import UserService from "../service/UserService";
function ProfileAdmin() {
    const user = useSelector((state) => state.account.user);

    let queryProfile = "";

    if (user?.ROLE === 'ADMIN') {
        queryProfile = `MAADMIN=${user?.MAADMIN}`;
    } else {
        queryProfile = `SDT=${user?.SDT}`;
    }

    const { data: dataProfile, mutate } = useSWR(`${API_USER}/read?${queryProfile}`)
    // console.log("dataProfile", dataProfile)
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("")
    const [password, setPassWord] = useState("")

    useEffect(() => {
        setFullName(dataProfile?.admin?.HOTEN || "")
        setEmail(dataProfile?.admin?.EMAIL || "")
        setGender(dataProfile?.admin?.GIOITINH || "")
        setAddress(dataProfile?.admin?.DIACHI || "")
        setPhone(dataProfile?.admin?.SDT || "")
    }, [dataProfile])


    const tabs = [
        {
            id: '1', label: 'Cập nhật', content:
                <div className="flex flex-col gap-y-3">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input type="text" label="Họ tên" value={fullName} onValueChange={setFullName} />
                        <Input type="email" label="Email" value={email} onValueChange={setEmail} />
                    </div>
                    <div className="grid grid-cols-2">
                        <Input type="text" className="pe-2" label="Số điện thoại" isDisabled value={phone} onValueChange={setPhone} />
                        <RadioGroup className="ms-2"
                            label="Giới tính"
                            orientation="horizontal"
                            value={gender}
                            onValueChange={setGender}
                        >
                            <Radio value="Nam">Nam</Radio>
                            <Radio value="Nữ">Nữ</Radio>

                        </RadioGroup>
                    </div>
                    <div>
                        <Input type="text" className="pe-2" label="Địa chỉ" value={address} onValueChange={setAddress} />
                    </div>
                    <Button color="primary" className="flex ms-auto" onClick={() => handleUpdateProfile()}>
                        Cập nhật
                    </Button>
                </div>


        },
        // {
        //     id: '2', label: 'Mật khẩu', content:
        //         <div className="flex flex-col gap-y-3">
        //             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        //                 <Input type="password" label="Mật khẩu" value={password} onValueChange={setPassWord} />
        //                 <Input type="email" label="Nhập lại mật khẩu" placeholder="Enter your email" />
        //             </div>
        //             <div className="flex justify-end">
        //                 <Button color="primary" onClick={() => handleUpdatePassword()}>Xác nhận</Button>
        //             </div>

        //         </div>
        // },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const handleUpdateProfile = async () => {
        try {
            const roleFormat = user?.ROLE.toLowerCase();

            const data = {
                TENDANGNHAP: user?.TENDANGNHAP,
                HOVATEN: fullName,
                EMAIL: email,
                GIOITINH: gender,
                DIACHI: address,
                ROLE: roleFormat
            }
            const res = await UserService.updateUser(data);
            toast.success(res.message);
            mutate();
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleUpdatePassword = async () => {
        try {
            const roleFormat = user?.ROLE.toLowerCase();
            const data = {
                TENDANGNHAP: user?.TENDANGNHAP,
                MATKHAU: password,
                ROLE: roleFormat
            }
            const res = await UserService.updateUser(data);
            toast.success(res.message);
            mutate();
        } catch (e) {
            toast.error(e.message);
        }
    }

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
                                // src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                                src="https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                alt="Woman looking front"
                            />
                        </div>
                        <div className="ml-4">
                            <h2 className="font-bold text-2xl text-white">{dataProfile?.admin?.HOTEN || dataProfile?.usermanager?.HOTEN}</h2>
                            <p className="text-white font-medium">{user?.ROLE}</p>
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
                        <Card className="max-w-[400px] rounded-lg px-2 shadow-lg">
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
                                    <p className="ms-auto font-medium">{dataProfile?.admin?.HOTEN || dataProfile?.usermanager?.HOTEN}</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faMarsAndVenus} />
                                        <p className="font-medium">Giới tính:</p>
                                    </div>
                                    <p className="ms-auto font-medium">{dataProfile?.admin?.GIOITINH || dataProfile?.usermanager?.GIOITINH}</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faPhone} />
                                        <p className="font-medium">SĐT:</p>
                                    </div>
                                    <p className="ms-auto font-medium">{dataProfile?.admin?.SDT || dataProfile?.usermanager?.SDT}</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <p className="font-medium">Email:</p>
                                    </div>
                                    <p className="ms-auto font-medium">{dataProfile?.admin?.EMAIL || dataProfile?.usermanager?.EMAIL}</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faCircleUser} />
                                        <p className="font-medium">Tên đăng nhập:</p>
                                    </div>
                                    <p className="ms-auto font-medium">{dataProfile?.TENDANGNHAP}</p>
                                </div>
                                <div className="flex">
                                    <div className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faUserGear} />
                                        <p className="font-medium">Vai trò:</p>
                                    </div>
                                    {dataProfile?.admin ? (
                                        <Chip variant="flat" color="primary" className="ms-auto">
                                            Admin
                                        </Chip>
                                    ) : (
                                        <Chip variant="flat" color="warning" className="ms-auto">
                                            User manager
                                        </Chip>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-span-3 md:col-span-2 shadow-lg" style={{
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