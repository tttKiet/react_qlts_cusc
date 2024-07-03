import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_USER } from "../../constants";
import useSWR from "swr";

function ModalSegmentOpenContact({
  isOpen,
  onClose,
  handleSubmit,
  segmentEditOpen,
}) {
  const [choose, setChoose] = useState(
    new Set([segmentEditOpen?.TRANGTHAILIENHE || "1"])
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitLocal() {
    await handleSubmit(Array.from(choose.values()));
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Chỉnh sửa liên hệ cho đoạn {segmentEditOpen?.madoan}
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-2">
                <Select
                  size="lg"
                  label={"Lần liên hệ"}
                  disallowEmptySelection={true}
                  variant="bordered"
                  selectedKeys={choose}
                  onSelectionChange={(value) => setChoose(value)}
                >
                  <SelectItem key={"0"} value={"0"}>
                    Đóng
                  </SelectItem>
                  <SelectItem key={"1"} value={"1"}>
                    Lần 1
                  </SelectItem>
                  <SelectItem key={"2"} value={"2"}>
                    Lần 2
                  </SelectItem>
                  <SelectItem key={"3"} value={"3"}>
                    Lần 3
                  </SelectItem>
                  <SelectItem key={"4"} value={"4"}>
                    Lần 4
                  </SelectItem>
                  <SelectItem key={"5"} value={"5"}>
                    Lần 5
                  </SelectItem>
                  <SelectItem key={"6"} value={"6"}>
                    Lần 6
                  </SelectItem>
                  <SelectItem key={"7"} value={"7"}>
                    Lần 7
                  </SelectItem>
                </Select>
              </div>
              <div className="flex">
                <div className="flex gap-1 text-sm"></div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
              <Button
                color="primary"
                onPress={handleSubmitLocal}
                isLoading={isLoading}
              >
                Thực hiện
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalSegmentOpenContact;
