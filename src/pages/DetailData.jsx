import { faBullseye, faAddressCard, faClipboard, faUser, faArrowUpRightFromSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";
import { Tag } from "antd";
import { useParams } from 'react-router-dom';
import useSWR from "swr";
import { API_CUSTOMER } from "../constants";
import { toast } from "react-toastify";

function DetailData() {

    const { id } = useParams();

    const { data: detailData, mutate } = useSWR(`${API_CUSTOMER}/${id}`)
    console.log(detailData)

    const contactDetails = [1, 2, 3, 4, 5, 6, 7].map(lan => {
        const contact = detailData?.lienhe.find(c => c.LAN == lan);
        return {
            LAN: lan,
            THOIGIAN: contact ? contact.THOIGIAN : 'Trống',
            TRANGTHAI: contact ? contact.trangthai.TENTRANGTHAI : 'Trống',
            CHITIETTRANGTHAI: contact ? contact.CHITIETTRANGTHAI : 'Trống',
            KETQUA: contact ? contact.KETQUA : 'Trống',
        };
    });

    const handleDownloadFile = async (data) => {
        const MAHOSO = data?.MAHOSO;
        if (!MAHOSO) {
            return toast.warning("MAHOSO chưa có nhé");
        }
        try {
            const response = await SegmentService.downLoadFile({
                MAHOSO: MAHOSO,
            });

            console.log("response", response);

            // Kiểm tra xem response có dữ liệu file không
            if (!response || !response.data) {
                return toast.error("Không có dữ liệu tệp để tải xuống.");
            }

            // Chuyển đổi dữ liệu nhận được thành một đối tượng Blob
            const blob = new Blob([response.data]);

            // Tạo URL để hiển thị hoặc tải xuống file
            const url = window.URL.createObjectURL(blob);

            // Tạo một phần tử <a> ẩn để khởi tạo việc tải xuống file
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = response.filename || "downloaded_file"; // Tên file để tải về

            // Thêm phần tử <a> vào DOM và kích hoạt sự kiện click để tải xuống file
            document.body.appendChild(a);
            a.click();

            // Sau khi hoàn tất, loại bỏ phần tử <a> đã tạo
            document.body.removeChild(a);

            // Giải phóng URL đã tạo
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", { error: error?.message });
            toast.error("Đã xảy ra lỗi khi tải xuống file.", error);
        }
    };


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
                                    <p>{detailData?.HOTEN}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Tỉnh/Thành phố</p>
                                    <p>{detailData?.tinh?.TENTINH}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Trường</p>
                                    <p>{detailData?.truong?.TENTRUONG}</p>
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
                                    <p>{detailData?.dulieukhachhang?.SDT}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Điện thoại ba</p>
                                    <p>{detailData?.dulieukhachhang?.SDTBA || 'Trống'}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Điện thoại mẹ</p>
                                    <p>{detailData?.dulieukhachhang?.SDTME || 'Trống'}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Zalo</p>
                                    <p>{detailData?.dulieukhachhang?.SDTZALO || 'Trống'}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>FaceBook</p>
                                    <p>{detailData?.dulieukhachhang?.FACEBOOK || 'Trống'}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Email</p>
                                    <p>{detailData?.EMAIL || 'Trống'}</p>
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
                                    <p>{detailData?.nghenghiep?.TENNGHENGHIEP || 'Trống'}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Hình thức thu thập</p>
                                    <p>{detailData?.hinhthucthuthap?.TENHINHTHUC || 'Trống'}</p>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_1fr] gap-0">
                                    <p className="font-bold flex items-center">Ngành yêu thích</p>
                                    <div className="text-right w-80">
                                        {detailData?.nganhyeuthich.length != 0 ? detailData?.nganhyeuthich.map((job, index) => (
                                            <Tag key={index} bordered={false} color="processing">
                                                {job?.nganh?.TENNGANH}
                                            </Tag>
                                        )) : 'Trống'}

                                    </div>
                                </div>
                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Ngành đăng ký</p>
                                    <p>{detailData?.phieudkxettuyen?.nganh?.TENNGANH || "Trống"}</p>
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
                                    <div className="max-w-[400px]">
                                        {/* <p>{detailData?.phieudkxettuyen?.hoso || 'Trống'}</p> */}
                                        <div>{detailData?.phieudkxettuyen.hoso.length > 0 ? (
                                            detailData?.phieudkxettuyen.hoso.map((item, index) => (
                                                <p key={index}>{item.HOSO}</p>
                                            ))
                                        ) : 'Trống'}</div>

                                    </div>
                                </div>

                                <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                    <p className='font-bold'>Kết quả Cao đẳng/Đại học</p>

                                    {detailData?.phieudkxettuyen?.ketquatotnghiep?.MAKETQUA == 1 ? (
                                        <Chip
                                            variant="flat"
                                            color="success"
                                        >
                                            {detailData?.phieudkxettuyen?.ketquatotnghiep?.KETQUA}
                                        </Chip>
                                    ) : (
                                        detailData?.phieudkxettuyen?.ketquatotnghiep?.MAKETQUA == 3 ? (
                                            <Chip
                                                variant="flat"
                                                color="warning"
                                            >
                                                {detailData?.phieudkxettuyen?.ketquatotnghiep?.KETQUA}
                                            </Chip>
                                        ) : (
                                            <Chip
                                                variant="flat"
                                                color="default"
                                            >
                                                Chưa có thông tin
                                            </Chip>
                                        )

                                    )}

                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-4 mt-4 gap-4">
                    {contactDetails.map((contact, index) => (
                        <div key={index} className="col-span-4 md:col-span-1">
                            <Card className="w-full mb-4">
                                <CardHeader className="flex gap-3 px-6">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <div className="">
                                        <h1 className='font-bold'>Chi tiết liên hệ {contact.LAN}</h1>
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody className='px-6 gap-4'>
                                    <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                        <p className='font-bold'>Thời gian</p>
                                        <p>{contact.THOIGIAN}</p>
                                    </div>
                                    <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                        <p className='font-bold'>Trạng thái</p>
                                        <p>{contact.TRANGTHAI}</p>
                                    </div>
                                    <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                        <p className='font-bold'>Chi tiết trạng thái</p>
                                        <p>{contact.CHITIETTRANGTHAI}</p>
                                    </div>
                                    <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                                        <p className='font-bold'>Kết quả</p>
                                        <p>{contact.KETQUA}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                    ))}

                </div>


            </div >


        </>
    );
}

export default DetailData;