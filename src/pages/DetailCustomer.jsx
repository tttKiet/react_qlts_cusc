// import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faAddressCard,
  faClipboard,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowUpRightFromSquare,
  faBullseye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Tooltip,
  Input,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { API_CUSTOMER } from "../constants";
import { toast } from "react-toastify";
import { Result, Tag } from "antd";
import { useAuth } from "../hooks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spin } from "antd";

import SegmentService from "../service/SegmentService";
import CustomerService from "../service/CustomerService";

function DetailCustomer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
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

  // handle Download File
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

  const [isEdit, setIsEdit] = useState(false);
  const [fullName, setFullName] = useState("");
  const [province, setProvince] = useState("");
  const [school, setSchool] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneFather, setPhoneFather] = useState("");
  const [phoneMother, setPhoneMother] = useState("");
  const [zalo, setZalo] = useState("");
  const [faceBook, setFaceBook] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setFullName(data?.HOTEN)
    setProvince(data?.tinh.TENTINH)
    setSchool(data?.truong.TENTRUONG)
    setPhone(data?.SDT)
    setPhoneFather(data?.dulieukhachhang.SDTBA || "")
    setPhoneMother(data?.dulieukhachhang.SDTME || "")
    setZalo(data?.dulieukhachhang.SDTZALO || "")
    setFaceBook(data?.dulieukhachhang.FACEBOOK || "")
    setEmail(data?.EMAIL || "")
  }, [data])

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdateInfo = async () => {
    try {
      const dataInfo = {
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
      const res = await CustomerService.updateCustomer(dataInfo);
      mutate();
      toast.success(res.message)
    } catch (e) {
      toast.error(e.message)
    }
  }

  console.log("data", data)

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
                      <div className="flex">
                        <h1 className="font-bold">Thông tin cá nhân</h1>

                        <div onClick={handleEditToggle} className="absolute right-5 cursor-pointer">
                          {isEdit ? (
                            <Tooltip content="Lưu" color="primary">
                              <FontAwesomeIcon onClick={handleUpdateInfo} className="text-blue-600" size="lg" icon={faFloppyDisk} />
                            </Tooltip>) : (
                            <Tooltip content="Chỉnh sửa" color="primary">
                              <FontAwesomeIcon size="lg" className="text-blue-600" icon={faPenToSquare} />
                            </Tooltip>
                          )}
                        </div>
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
                        <p className="font-bold flex items-center">Điện thoại ba</p>
                        {isEdit ? (
                          <Input type="text" style={{ textAlign: "right", fontSize: "16px" }} aria-placeholder="fullName" size="sm" className="w-32" variant="underlined" value={phoneFather} onValueChange={setPhoneFather} />
                        ) : (
                          <p>{data?.dulieukhachhang?.SDTBA || "Trống"}</p>
                        )}
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold flex items-center">Điện thoại mẹ</p>
                        {isEdit ? (
                          <Input type="text" style={{ textAlign: "right", fontSize: "16px" }} aria-placeholder="fullName" className="w-32" variant="underlined" value={phoneMother} onValueChange={setPhoneMother} />
                        ) : (
                          <p>{data?.dulieukhachhang?.SDTME || "Trống"}</p>
                        )}
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold flex items-center">Zalo</p>
                        {isEdit ? (
                          <Input type="text" style={{ textAlign: "right", fontSize: "16px" }} aria-placeholder="fullName" className="w-32" variant="underlined" value={zalo} onValueChange={setZalo} />
                        ) : (
                          <p>{data?.dulieukhachhang?.SDTZALO || "Trống"}</p>
                        )}
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold flex items-center">FaceBook</p>
                        {isEdit ? (
                          <Input type="text" style={{ textAlign: "right", fontSize: "16px" }} aria-placeholder="fullName" className="w-32" variant="underlined" value={faceBook} onValueChange={setFaceBook} />
                        ) : (
                          <p>{data?.dulieukhachhang?.FACEBOOK || "Trống"}</p>
                        )}
                      </div>
                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold flex items-center">Email</p>
                        {isEdit ? (
                          <Input type="text" style={{ textAlign: "right", fontSize: "16px" }} aria-placeholder="fullName" className="w-40" variant="underlined" value={email} onValueChange={setEmail} />
                        ) : (
                          <p>{data?.EMAIL || "Trống"}</p>
                        )}
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
                        <p className="font-bold flex items-center">Ngành yêu thích</p>
                        <div className="text-right w-72">
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
                        {/* <div>
                          <Link
                            to="https://github.com/nextui-org/nextui"
                            className="cursor-pointer text-primary-500"
                          >
                            Vui lòng truy cập vào đây
                            <FontAwesomeIcon
                              className="ms-1 text-tiny"
                              icon={faArrowUpRightFromSquare}
                            />
                          </Link>
                        </div> */}
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

                      <div className="groupInput grid grid-cols-[1fr_auto] gap-0">
                        <p className="font-bold">Kết quả Cao đẳng/Đại học</p>
                        {/* <Chip variant="flat" color="warning">
                          Đang chờ
                        </Chip> */}
                        {data?.phieudkxettuyen?.ketquatotnghiep?.MAKETQUA == 1 ? (
                          <Chip
                            variant="flat"
                            color="success"
                          >
                            {data?.phieudkxettuyen?.ketquatotnghiep?.KETQUA}
                          </Chip>
                        ) : (
                          data?.phieudkxettuyen?.ketquatotnghiep?.MAKETQUA == 3 ? (
                            <Chip
                              variant="flat"
                              color="warning"
                            >
                              {data?.phieudkxettuyen?.ketquatotnghiep?.KETQUA}
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
