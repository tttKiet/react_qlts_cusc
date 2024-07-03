import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

function ModalSegment({
  isOpen,
  onClose,
  handleSubmit,
  selectedKeys,
  rowAvailable,
}) {
  const [rowQuanlity, setRowQuanlity] = useState(selectedKeys?.size);

  function handleSubmitLocal() {
    if (rowQuanlity <= 0) {
      toast.warning("Vui lòng chọn số dòng > 0.");
    } else {
      handleSubmit(rowQuanlity);
      onClose();
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Phân đoạn dữ liệu
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-2">
                <Input
                  type="Number"
                  variant="bordered"
                  isRequired={true}
                  label="Nhập số lượng dòng trên 1 đoạn"
                  classNames={{
                    label: "font-medium",
                  }}
                  value={rowQuanlity}
                  size="lg"
                  onValueChange={(value) => setRowQuanlity(value)}
                />
              </div>
              <div className="flex items-center justify-start gap-2">
                <span>Gợi ý: </span>
                <Chip
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  color="default"
                  className="cursor-pointer"
                  onClick={() =>
                    setRowQuanlity(
                      selectedKeys?.size ? selectedKeys?.size : rowAvailable
                    )
                  }
                >
                  {selectedKeys?.size ? selectedKeys?.size : rowAvailable}
                </Chip>
                <Chip
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  color="default"
                  className="cursor-pointer"
                  onClick={() =>
                    setRowQuanlity(
                      Math.round(
                        selectedKeys?.size
                          ? selectedKeys?.size / 2
                          : rowAvailable / 2
                      )
                    )
                  }
                >
                  {Math.round(
                    selectedKeys?.size
                      ? selectedKeys?.size / 2
                      : rowAvailable / 2
                  )}
                </Chip>
                <Chip
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  color="default"
                  className="cursor-pointer"
                  onClick={() =>
                    setRowQuanlity(
                      Math.floor(
                        selectedKeys?.size
                          ? selectedKeys?.size / 3
                          : rowAvailable / 3
                      )
                    )
                  }
                >
                  {Math.floor(
                    selectedKeys?.size
                      ? selectedKeys?.size / 3
                      : rowAvailable / 3
                  )}
                </Chip>
              </div>
              <div className="flex">
                <div className="flex gap-1 text-sm">
                  <span>
                    Bạn đang phân:
                    <span className=" font-medium"> {selectedKeys?.size} </span>
                    dòng
                  </span>{" "}
                  |
                  <span>
                    {" "}
                    Dữ liệu khả dụng:{" "}
                    <span className="font-medium">{rowAvailable || 0}</span>.
                  </span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
              <Button
                color="primary"
                isDisabled={rowQuanlity > 0 ? false : true}
                onPress={handleSubmitLocal}
              >
                Phân đoạn
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalSegment;
