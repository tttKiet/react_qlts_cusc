import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

function DetailCustomer() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div>
                <div className="headerPage bg-white flex ">
                    <img className="w-10/12 m-auto" src="/image/logoHeader.jpeg" alt="" />
                </div>
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold text-center mt-5 mb-2">THÔNG TIN HỌC SINH</h1>
                    <div className="infoCustomer rounded-lg shadow-lg shadow-gray-500/50">
                        <div className="infoPersonal">
                            <h2 className="text-xl font-bold text-center  bg-slate-200 p-2 rounded-t-lg ">THÔNG TIN CÁ NHÂN</h2>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Họ và tên</div>
                                <div className="text-center text-lg">Nguyên Văn Y</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Tỉnh/Thành phố</div>
                                <div className="text-center text-lg">Vĩnh Long</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Trường</div>
                                <div className="text-center text-lg">THPT Vĩnh Long 1</div>
                            </div>
                        </div>
                        <div className="infoContact">
                            <h2 className="text-xl font-bold text-center  bg-slate-200 p-2">THÔNG TIN LIÊN HỆ</h2>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Số điện thoại</div>
                                <div className="text-center text-lg">0187654358</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Số điện thoại ba</div>
                                <div className="text-center text-lg">Không có</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Số điện thoại mẹ</div>
                                <div className="text-center text-lg">Không có</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Zalo</div>
                                <div className="text-center text-lg">0931119404</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">FaceBook</div>
                                <div className="text-center text-lg">Chưa có thông tin</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Email</div>
                                <div className="text-center text-lg">Chưa có thông tin</div>
                            </div>
                        </div>
                        <div className="infoObject">
                            <h2 className="text-xl font-bold text-center  bg-slate-200 p-2">ĐỐI TƯỢNG</h2>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Nghệ nghiệp</div>
                                <div className="text-center text-lg">Học sinh</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Hình thức thu thập</div>
                                <div className="text-center text-lg">Gọi điện</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Ngành yêu thích</div>
                                <div className="text-center text-lg">ARENA ARENA + CAO ĐẲNG</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Ngành đăng ký</div>
                                <div className="text-center text-lg">Chưa có</div>
                            </div>
                        </div>
                        <div className="formRegisterAdmission">
                            <h2 className="text-xl font-bold text-center  bg-slate-200 p-2">PHIẾU ĐĂNG KÝ XÉT TUYỂN</h2>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Kênh nhận thông báo</div>
                                <div className="text-center text-lg">Zalo</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Khóa học quan tâm</div>
                                <div className="text-center text-lg">Dài hạn</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Hồ sơ</div>
                                <div className="text-center text-lg">Chưa có thông tin</div>
                            </div>
                            <div className="grid grid-cols-2 p-1">
                                <div className="text-center text-lg">Kết quả Cao đẳng/Đại học</div>
                                <div className="text-center text-lg">Đậu</div>
                            </div>
                        </div>
                    </div>
                    <div className="btnRegisterAdmission mt-5 mb-5 flex">
                        <Button color="primary" onPress={onOpen} className="ms-auto">Phiếu đăng ký xét tuyển</Button>
                    </div>
                </div>
                <div className="footerPage bg-[url('/image/background.jpg')] bg-center bg-cover" style={{ color: "#fff" }}>
                    <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                        <div className="col-span-2">
                            <h2 className="text-2xl text-center font-bold justify-center">TRUNG TÂM CÔNG NGHỆ PHẦN MỀM ĐẠI HỌC CẦN THƠ</h2>
                            <div className="addressCenter flex justify-center">
                                <div className="icon mr-1 flex items-center">
                                    <FontAwesomeIcon size="lg" icon={faLocationDot} />
                                </div>
                                <p className="text-lg font-bold"> Khu III, Đại Học Cần Thơ, 01 Lý Tự Trọng, Q. Ninh Kiều, TP. Cần Thơ</p>
                            </div>
                            <div className="phoneCenter flex justify-center ">
                                <div className="icon mr-1 flex items-center">
                                    <FontAwesomeIcon size="lg" icon={faPhone} />

                                </div>
                                <p className="text-lg font-bold justify-center ">0292 383 5581</p>
                            </div>
                            <div className="zaloCenter flex justify-center ">
                                <div className="icon text-xl font-bold mr-1">
                                    Zalo:
                                </div>
                                <p className="text-lg font-bold">0868 952 535</p>
                            </div>
                            <div className="mailCenter flex justify-center ">
                                <div className="icon flex items-center mr-1">
                                    <FontAwesomeIcon size="lg" icon={faEnvelope} />
                                </div>
                                <p className="text-lg font-bold">tuyensinh@cusc.ctu.edu.vn</p>
                            </div>
                        </div>
                        <div className="">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.7933383849145!2d105.77767954957537!3d10.033905575169303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0881f9a732075%3A0xfa43fbeb2b00ca73!2sCUSC%20-%20Cantho%20University%20Software%20Center!5e0!3m2!1svi!2s!4v1654614294824!5m2!1svi!2s"
                                width="100%"
                                height={180}
                                style={{ border: 0, marginTop: 10 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                        </div>
                    </div>
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