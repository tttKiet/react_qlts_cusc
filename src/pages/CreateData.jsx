import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Spin } from "antd";

import SegmentService from "../service/SegmentService";

function CreateData() {
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop1 = useCallback((acceptedFiles) => {
    setFiles1((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const onDrop2 = useCallback((acceptedFiles) => {
    setFiles2((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
    isDragActive: isDragActive1,
  } = useDropzone({ onDrop: onDrop1 });
  const {
    getRootProps: getRootProps2,
    getInputProps: getInputProps2,
    isDragActive: isDragActive2,
  } = useDropzone({ onDrop: onDrop2 });

  const handleUploadFileDataCustomerNew = async () => {
    if (!files1[0]) {
      return toast.error("Vui lòng chọn file !!!");
    }

    const formData = new FormData();
    formData.append("file", files1[0]);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          folder_type: "dulieu_khachhang",
        },
      };

      // Gọi API sử dụng Axios và truyền formData và config
      setLoading(true);
      const res = await SegmentService.addFileExcelDataCustomerNew(
        formData,
        config
      );
      if (res && res.statusCode === 200) {
        toast.success("Upload file thành công");
      }

      // Xử lý kết quả trả về (nếu cần)
    } catch (error) {
      // Xử lý lỗi nếu có
      if (error.statusCode == 422) {
        toast.error("Lưu ý định dạng file upload là file excel nhé !!!");
      }
      if (error.statusCode == 500) {
        toast.error("Dữ liệu file có vấn đề nhé  !!!");
      }
      console.error("Error while uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFileDataCustomerOld = async () => {
    if (!files2[0]) {
      return toast.error("Vui lòng chọn file !!!");
    }

    const formData = new FormData();
    formData.append("file", files2[0]);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          folder_type: "dulieu_khachhang",
        },
      };

      // Gọi API sử dụng Axios và truyền formData và config
      setLoading(true);
      const res = await SegmentService.addFileExcelDataCustomerOld(
        formData,
        config
      );
      if (res && res.statusCode === 200) {
        toast.success("Upload file thành công");
      }
      // Xử lý kết quả trả về (nếu cần)
    } catch (error) {
      // Xử lý lỗi nếu có
      if (error.statusCode == 422) {
        toast.error("Lưu ý định dạng file upload là file excel nhé !!!");
      }
      if (error.statusCode == 500) {
        toast.error("Dữ liệu file có vấn đề nhé  !!!");
      }
      console.error("Error while uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={loading} tip="Loading" size="small">
        <div className="grid grid-cols-2 gap-4">
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="flex gap-3 pb-0">
              <div className="flex gap-2">
                <div>
                  <FontAwesomeIcon
                    className="border-2 p-3 rounded-full w-7 h-7"
                    icon={faCloudArrowUp}
                  />
                </div>
                <div>
                  <h1 className="text-lg font-medium">Thêm khách hàng</h1>
                  <p>Đưa file vào bên dưới</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div>
                <div
                  {...getRootProps1()}
                  className="p-4 border-2 border-dashed border-gray-400 rounded mt-4"
                >
                  <input {...getInputProps1()} />
                  {isDragActive1 ? (
                    <div className="flex flex-col items-center justify-center h-40">
                      <FontAwesomeIcon
                        className="w-10 h-10"
                        icon={faCloudArrowUp}
                      />
                      <p>Kéo thả file vào đây...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40">
                      <FontAwesomeIcon
                        className="w-10 h-10"
                        icon={faCloudArrowUp}
                      />
                      <p>Kéo thả file vào đây, hoặc click để chọn file</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <h2 className="font-medium">File đã chọn:</h2>
                <ul className="mt-2">
                  {files1?.length > 0 ? (
                    files1.map((file, index) => (
                      <li key={index} className="mt-1">
                        {file.name}
                      </li>
                    ))
                  ) : (
                    <div>
                      <p className="text-center font-medium">Trống</p>
                    </div>
                  )}
                </ul>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                className="w-full"
                color="primary"
                onClick={handleUploadFileDataCustomerNew}
              >
                Upload
              </Button>
            </CardFooter>
          </Card>
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="flex gap-3 pb-0">
              <div className="flex gap-2">
                <div>
                  <FontAwesomeIcon
                    className="border-2 p-3 rounded-full w-7 h-7"
                    icon={faCloudArrowUp}
                  />
                </div>
                <div>
                  <h1 className="text-lg font-medium">Thêm khách hàng cũ</h1>
                  <p>Đưa file vào bên dưới</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div>
                <div
                  {...getRootProps2()}
                  className="p-4 border-2 border-dashed border-gray-400 rounded mt-4"
                >
                  <input {...getInputProps2()} />
                  {isDragActive2 ? (
                    <div className="flex flex-col items-center justify-center h-40">
                      <FontAwesomeIcon
                        className="w-10 h-10"
                        icon={faCloudArrowUp}
                      />
                      <p>Kéo thả file vào đây...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40">
                      <FontAwesomeIcon
                        className="w-10 h-10"
                        icon={faCloudArrowUp}
                      />
                      <p>Kéo thả file vào đây, hoặc click để chọn file</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <h2 className="font-medium">File đã chọn:</h2>
                <ul className="mt-2">
                  {files2?.length > 0 ? (
                    files2.map((file, index) => (
                      <li key={index} className="mt-1">
                        {file.name}
                      </li>
                    ))
                  ) : (
                    <div>
                      <p className="text-center font-medium">Trống</p>
                    </div>
                  )}
                </ul>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                className="w-full"
                color="primary"
                onClick={handleUploadFileDataCustomerOld}
              >
                Upload
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Spin>
    </>
  );
}

export default CreateData;
