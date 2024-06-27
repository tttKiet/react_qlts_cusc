// import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUser, faAddressCard, faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faArrowUpRightFromSquare, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, Divider, CardBody, CardFooter, Image, Chip } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { API_CUSTOMER } from '../constants';
import { toast } from 'react-toastify';
import { Tag } from 'antd';
import { useAuth } from '../hooks';
import { useSelector } from 'react-redux';

function DetailCustomer() {

    const navigate = useNavigate();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // const { id } = useParams();

    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const user = useSelector((state) => state.account.user);
    const { logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <div>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Link to={"/"} type="primary"><Button type='primary'>Back Home</Button></Link>}
                />
            </div>
        );
    }

    const { data, mutate } = useSWR(`${API_CUSTOMER}/${user.SDT_KH}`);
    return (
        <>
            <div>
                <div className="headerPage bg-white flex ">
                    <img className="w-10/12 m-auto" src="/image/logoHeader2.png" alt="" />
                </div>
                <div className="container mx-auto">
                    {data === undefined ? (
                        <div className='flex-col justify-center items-center' style={{ height: 500 }}>
                            <img className="m-auto mt-16 w-80" src="/image/userNotFound.png" alt="" />
                            <h1 className='text-center text-xl mt-4 font-bold'>Không tìm thấy khách hàng</h1>
                            <Button className='m-auto flex mt-4' color='primary' onClick={() => navigate("/")}>Về trang chủ</Button>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl font-bold text-center mt-5 mb-5">THÔNG TIN HỌC SINH</h1>
                            <div className="grid grid-cols-2 mt-4">
                                <div className="col-span-2 md:col-span-1">
                                    <Card className="max-w-[500px] m-auto h-full">
                                        <CardHeader className="flex gap-3 px-6 justify-center">
                                            <FontAwesomeIcon icon={faUser} />
                                            <div className="">
                                                <h1 className='font-bold'>Thông tin cá nhân</h1>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody className='px-6 gap-4'>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Họ và tên</p>
                                                <p>{data?.HOTEN}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Tỉnh/Thành phố</p>
                                                <p>{data?.tinh?.TENTINH}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Trường</p>
                                                <p>{data?.truong?.TENTRUONG}</p>
                                            </div>
                                        </CardBody>
                                        <Divider />
                                        <CardHeader className="flex gap-3 px-6 justify-center">
                                            <FontAwesomeIcon icon={faAddressCard} />
                                            <div className="">
                                                <h1 className='font-bold'>Thông tin liên hệ</h1>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody className='px-6 gap-4'>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Điện thoại</p>
                                                <p>{data?.dulieukhachhang?.SDT}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Điện thoại ba</p>
                                                <p>{data?.dulieukhachhang?.SDTBA || "Trống"}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Điện thoại mẹ</p>
                                                <p>{data?.dulieukhachhang?.SDTME || "Trống"}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Zalo</p>
                                                <p>{data?.dulieukhachhang?.SDTZALO || "Trống"}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>FaceBook</p>
                                                <p>{data?.dulieukhachhang?.FACEBOOK || "Trống"}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Email</p>
                                                <p>{data?.EMAIL || "Trống"}</p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <Card className="max-w-[500px] m-auto h-full">
                                        <CardHeader className="flex gap-3 px-6 justify-center">
                                            <FontAwesomeIcon icon={faBullseye} />
                                            <div className="">
                                                <h1 className='font-bold'>Đối tượng</h1>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody className='px-6 gap-4'>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Nghề nghiệp</p>
                                                <p>{data?.nghenghiep?.TENNGHENGHIEP || "Trống"}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Hình thức thu thập</p>
                                                <p>{data?.hinhthucthuthap?.TENHINHTHUC || "Trống"}</p>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Ngành yêu thích</p>
                                                <div>
                                                    {data?.nganhyeuthich.length != 0 ? data?.nganhyeuthich.map((job, index) => (
                                                        <Tag key={index} bordered={false} color="processing">
                                                            {job?.nganh?.TENNGANH}
                                                        </Tag>
                                                    )) : 'Trống'}

                                                </div>
                                            </div>
                                            <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                                <p className='font-bold'>Ngành đăng ký</p>
                                                <p>{data?.phieudkxettuyen?.nganh?.TENNGANH || "Trống"}</p>
                                            </div>
                                        </CardBody>
                                        <Divider />
                                        <CardHeader className="flex gap-3 px-6 justify-center">
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
                            <div className="btnRegisterAdmission mt-5 flex">
                                <Button color="danger" onPress={logout} className="me-auto">Đăng xuất</Button>
                                <Button color="primary" onPress={onOpen} className="ms-auto">Phiếu đăng ký xét tuyển</Button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Phiếu đăng ký xét tuyển</ModalHeader>
                            <ModalBody>
                                <p>
                                    Chọn file cần tải lên

                                </p>
                                <input type="file" />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Gửi
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default DetailCustomer;