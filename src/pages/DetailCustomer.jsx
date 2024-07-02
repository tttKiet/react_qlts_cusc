// import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faAddressCard,
  faClipboard,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Result, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import { API_CUSTOMER } from "../constants";
import { useAuth } from "../hooks";

import SegmentService from "../service/SegmentService";

function DetailCustomer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { id } = useParams();

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const { logout } = useAuth();
  const { data, mutate } = useSWR(`${API_CUSTOMER}/${user.SDT_KH}`);

  if (!isAuthenticated) {
    return (
      <div>
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link to={"/"} type="primary">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </div>
    );
  }

  // handleFile
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadFile = async (onClose) => {
    if (!selectedFile) {
      return toast.warning("Vui lòng chọn file update nhé ");
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("MAPHIEUDK", data?.phieudkxettuyen?.MAPHIEUDK);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          folder_type: "hosoPhieudkxettuyen",
        },
      };
      setLoading(true);
      const res = await SegmentService.dataFileCustomer(formData, config);
      if (res && res.statusCode === 200) {
        toast.success("Upload file thành công");
        onOpenChange(false);
        mutate();
        setSelectedFile(null);
      }
    } catch (error) {
      if (error.statusCode == 500 || error.statusCode == 422) {
        toast.error("Dữ liệu file có vấn đề nhé  !!!");
      }
      console.error("Error while uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="headerPage bg-white flex ">
          <img className="w-10/12 m-auto" src="/image/logoHeader2.png" alt="" />
        </div>
        <div className="container mx-auto">
          {data === undefined ? (
            <div
              className="flex-col justify-center items-center"
              style={{ height: 500 }}
            >
              <img
                className="m-auto mt-16 w-80"
                src="/image/userNotFound.png"
                alt=""
              />
              <h1 className="text-center text-xl mt-4 font-bold">
                Không tìm thấy khách hàng
              </h1>
              <Button
                className="m-auto flex mt-4"
                color="primary"
                onClick={() => navigate("/")}
              >
                Về trang chủ
              </Button>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-center mt-5 mb-5">
                THÔNG TIN HỌC SINH
              </h1>
              <div className="grid grid-cols-2 mt-4">
                <div className="col-span-2 md:col-span-1">
                  <Card className="max-w-[500px] m-auto h-full">
                    <CardHeader className="flex gap-3 px-6 justify-center">
                      <FontAwesomeIcon icon={faUser} />
                      <div className="">
                        <h1 className="font-bold">Thông tin cá nhân</h1>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="px-6 gap-4">
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Họ và tên</p>
                        <p>{data?.HOTEN}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Tỉnh/Thành phố</p>
                        <p>{data?.tinh?.TENTINH}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Trường</p>
                        <p>{data?.truong?.TENTRUONG}</p>
                      </div>
                    </CardBody>
                    <Divider />
                    <CardHeader className="flex gap-3 px-6 justify-center">
                      <FontAwesomeIcon icon={faAddressCard} />
                      <div className="">
                        <h1 className="font-bold">Thông tin liên hệ</h1>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="px-6 gap-4">
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Điện thoại</p>
                        <p>{data?.dulieukhachhang?.SDT}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Điện thoại ba</p>
                        <p>{data?.dulieukhachhang?.SDTBA || "Trống"}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Điện thoại mẹ</p>
                        <p>{data?.dulieukhachhang?.SDTME || "Trống"}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Zalo</p>
                        <p>{data?.dulieukhachhang?.SDTZALO || "Trống"}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">FaceBook</p>
                        <p>{data?.dulieukhachhang?.FACEBOOK || "Trống"}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Email</p>
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
                        <h1 className="font-bold">Đối tượng</h1>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="px-6 gap-4">
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Nghề nghiệp</p>
                        <p>{data?.nghenghiep?.TENNGHENGHIEP || "Trống"}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Hình thức thu thập</p>
                        <p>{data?.hinhthucthuthap?.TENHINHTHUC || "Trống"}</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Ngành yêu thích</p>
                        <div>
                          {data?.nganhyeuthich.length != 0
                            ? data?.nganhyeuthich.map((job, index) => (
                                <Tag
                                  key={index}
                                  bordered={false}
                                  color="processing"
                                >
                                  {job?.nganh?.TENNGANH}
                                </Tag>
                              ))
                            : "Trống"}
                        </div>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Ngành đăng ký</p>
                        <p>
                          {data?.phieudkxettuyen?.nganh?.TENNGANH || "Trống"}
                        </p>
                      </div>
                    </CardBody>
                    <Divider />
                    <CardHeader className="flex gap-3 px-6 justify-center">
                      <FontAwesomeIcon icon={faClipboard} />
                      <div className="">
                        <h1 className="font-bold">Phiếu đăng ký</h1>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="px-6 gap-4">
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Kênh nhận thông báo</p>
                        <p>Email</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Khóa học quan tâm</p>
                        <p>Dài hạn</p>
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Hồ sơ</p>
                        {data?.phieudkxettuyen?.hoso?.map((item, index) => {
                          const fullPath = item?.HOSO;
                          const parts = fullPath.split("\\");
                          const fileName = parts[parts.length - 1];
                          return (
                            <a
                              key={index}
                              href={`/api/v1/file/downLoadFile?MAHOSO=${item.MAHOSO}`}
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                color: "blue",
                              }}
                            >
                              {fileName}
                            </a>
                          );
                        })}
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Kết quả Cao đăng/Đại học</p>
                        <Chip variant="flat" color="warning">
                          Đang chờ
                        </Chip>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="btnRegisterAdmission mt-5 flex">
                <Button color="danger" onPress={logout} className="me-auto">
                  Đăng xuất
                </Button>
                <Button color="primary" onPress={onOpen} className="ms-auto">
                  Phiếu đăng ký xét tuyển
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Phiếu đăng ký xét tuyển
              </ModalHeader>
              <ModalBody>
                <p>Chọn file cần tải lên</p>
                <input type="file" onChange={handleFileChange} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="primary" onClick={handleUploadFile}>
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
