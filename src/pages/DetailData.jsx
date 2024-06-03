import { faBullseye, faAddressCard, faClipboard, faUser, faArrowUpRightFromSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";
import { Tag } from "antd";


function DetailData() {

    return (
        <>
            <div className="">
                <div className="grid grid-cols-2 mt-4 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <Card className="w-full h-full">
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faUser} />
                                <div className="">
                                    <h1 className='font-bold'>Thông tin cá nhân</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Họ và tên</p>
                                    <p>Nguyễn Thị Kim Dung</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Tỉnh/Thành phố</p>
                                    <p>Vĩnh Long</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Trường</p>
                                    <p>THPT Nguyễn Du</p>
                                </div>
                            </CardBody>
                            <Divider />
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faAddressCard} />
                                <div className="">
                                    <h1 className='font-bold'>Thông tin liên hệ</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Điện thoại</p>
                                    <p>0329876750</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Điện thoại ba</p>
                                    <p>Trống</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Điện thoại mẹ</p>
                                    <p>Trống</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Zalo</p>
                                    <p>Trống</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>FaceBook</p>
                                    <p>Trống</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Email</p>
                                    <p>kdung6843@gmail.com</p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Card className="w-full h-full">
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faBullseye} />
                                <div className="">
                                    <h1 className='font-bold'>Đối tượng</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Nghề nghiệp</p>
                                    <p>Học sinh</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Hình thức thu thập</p>
                                    <p>Thu thập thông tin - File mềm</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Ngành yêu thích</p>
                                    <div>
                                        <Tag bordered={false} color="processing">
                                            ARENA
                                        </Tag>
                                        <Tag bordered={false} color="processing">
                                            ARENA + CAO ĐẲNG
                                        </Tag>
                                        <Tag bordered={false} color="processing">
                                            APTECH + ĐH CẦN THƠ
                                        </Tag>

                                    </div>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Ngành đăng ký</p>
                                    <p>Trống</p>
                                </div>
                            </CardBody>
                            <Divider />
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faClipboard} />
                                <div className="">
                                    <h1 className='font-bold'>Phiếu đăng ký</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Kênh nhận thông báo</p>
                                    <p>Email</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Khóa học quan tâm</p>
                                    <p>Dài hạn</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Hồ sơ</p>
                                    <div>
                                        <Link
                                            to="https://github.com/nextui-org/nextui"
                                            className='cursor-pointer text-primary-500'
                                        >
                                            Vui lòng truy cập vào đây<FontAwesomeIcon className='ms-1 text-tiny' icon={faArrowUpRightFromSquare} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Kết quả Cao đăng/Đại học</p>
                                    <Chip
                                        variant="flat"
                                        color="warning"
                                    >
                                        Đang chờ
                                    </Chip>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-3 mt-4 gap-4">
                    <div className="col-span-3 md:col-span-1">
                        <Card className="w-full">
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faPhone} />
                                <div className="">
                                    <h1 className='font-bold'>Chi tiết liên hệ 1</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Thời gian</p>
                                    <p>5/6/2024</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Tỉnh/Thành phố</p>
                                    <p>Vĩnh Long</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Trường</p>
                                    <p>THPT Nguyễn Du</p>
                                </div>
                            </CardBody>

                        </Card>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                        <Card className="w-full h-full">
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faBullseye} />
                                <div className="">
                                    <h1 className='font-bold'>Đối tượng</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Nghề nghiệp</p>
                                    <p>Học sinh</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Hình thức thu thập</p>
                                    <p>Thu thập thông tin - File mềm</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Ngành yêu thích</p>
                                    <div>
                                        <Tag bordered={false} color="processing">
                                            ARENA
                                        </Tag>
                                        <Tag bordered={false} color="processing">
                                            ARENA + CAO ĐẲNG
                                        </Tag>
                                        <Tag bordered={false} color="processing">
                                            APTECH + ĐH CẦN THƠ
                                        </Tag>

                                    </div>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Ngành đăng ký</p>
                                    <p>Trống</p>
                                </div>
                            </CardBody>
                            <Divider />
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faClipboard} />
                                <div className="">
                                    <h1 className='font-bold'>Phiếu đăng ký</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Kênh nhận thông báo</p>
                                    <p>Email</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Khóa học quan tâm</p>
                                    <p>Dài hạn</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Hồ sơ</p>
                                    <div>
                                        <Link
                                            to="https://github.com/nextui-org/nextui"
                                            className='cursor-pointer text-primary-500'
                                        >
                                            Vui lòng truy cập vào đây<FontAwesomeIcon className='ms-1 text-tiny' icon={faArrowUpRightFromSquare} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Kết quả Cao đăng/Đại học</p>
                                    <Chip
                                        variant="flat"
                                        color="warning"
                                    >
                                        Đang chờ
                                    </Chip>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-span-3 md:col-span-1">
                        <Card className="w-full h-full">
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faBullseye} />
                                <div className="">
                                    <h1 className='font-bold'>Đối tượng</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Nghề nghiệp</p>
                                    <p>Học sinh</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Hình thức thu thập</p>
                                    <p>Thu thập thông tin - File mềm</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Ngành yêu thích</p>
                                    <div>
                                        <Tag bordered={false} color="processing">
                                            ARENA
                                        </Tag>
                                        <Tag bordered={false} color="processing">
                                            ARENA + CAO ĐẲNG
                                        </Tag>
                                        <Tag bordered={false} color="processing">
                                            APTECH + ĐH CẦN THƠ
                                        </Tag>

                                    </div>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Ngành đăng ký</p>
                                    <p>Trống</p>
                                </div>
                            </CardBody>
                            <Divider />
                            <CardHeader className="flex gap-3 px-6">
                                <FontAwesomeIcon icon={faClipboard} />
                                <div className="">
                                    <h1 className='font-bold'>Phiếu đăng ký</h1>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className='px-6 gap-4'>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Kênh nhận thông báo</p>
                                    <p>Email</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Khóa học quan tâm</p>
                                    <p>Dài hạn</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Hồ sơ</p>
                                    <div>
                                        <Link
                                            to="https://github.com/nextui-org/nextui"
                                            className='cursor-pointer text-primary-500'
                                        >
                                            Vui lòng truy cập vào đây<FontAwesomeIcon className='ms-1 text-tiny' icon={faArrowUpRightFromSquare} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Kết quả Cao đăng/Đại học</p>
                                    <Chip
                                        variant="flat"
                                        color="warning"
                                    >
                                        Đang chờ
                                    </Chip>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>


        </>
    );
}

export default DetailData;