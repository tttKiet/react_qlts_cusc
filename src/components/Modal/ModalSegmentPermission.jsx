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
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_USER } from "../../constants";
import useSWR from "swr";

function ModalSegmentPermission({
  isOpen,
  onClose,
  handleSubmit,
  selectedKeys,
}) {
  const [usermanangerSelected, setUserManagerSelected] = useState("");
  const { data: listUserManager } = useSWR(`${API_USER}/user-manager`);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitLocal() {
    if (!usermanangerSelected) {
      toast.warning("Vui lòng chọn Usermamanger.");
    } else {
      setIsLoading(true);
      await handleSubmit({ usermanager: usermanangerSelected });
      setIsLoading(false);
      setUserManagerSelected("");
      onClose();
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Phân quyền dữ liệu
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-2">
                <Autocomplete
                  aria-labelledby="province-label"
                  placeholder="Chọn user manager"
                  labelPlacement="outside"
                  variant="bordered"
                  size="md"
                  selectedKey={usermanangerSelected}
                  onSelectionChange={(value) => setUserManagerSelected(value)}
                >
                  {listUserManager?.map((usermanager) => (
                    <AutocompleteItem
                      key={usermanager.SDT}
                      value={usermanager.SDT}
                    >
                      {usermanager.usermanager.HOTEN}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="flex">
                <div className="flex gap-1 text-sm">
                  <span>
                    Bạn đang phân quyền cho:
                    <span className=" font-medium"> {selectedKeys?.size} </span>
                    đoạn
                  </span>{" "}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
              <Button
                color="primary"
                isDisabled={usermanangerSelected ? false : true}
                onPress={handleSubmitLocal}
                isLoading={isLoading}
              >
                Phân quyền
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalSegmentPermission;
