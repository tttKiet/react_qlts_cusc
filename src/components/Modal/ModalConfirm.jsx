import {
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

function ModalConfirm({
  madoan,
  isOpen,
  onClose,
  handleSubmit,
  title,
  content,
}) {
  function handleCanncelLocal() {
    toast.success("Đã hủy");
    onClose();
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title || "Bạn có chắc muốn xóa?"}
            </ModalHeader>
            <ModalBody>
              <div className="">{content}</div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleCanncelLocal}
              >
                Hủy
              </Button>
              <Button color="primary" onPress={() => handleSubmit(madoan)}>
                Đồng ý
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalConfirm;
