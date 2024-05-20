import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

function ModalComponent({ isOpen, onOpen, onClose, title, okModal, cancelModal, size, children }) {
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title || 'Modal tạo người dùng'}</ModalHeader>
                        <ModalBody>
                            {children}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                {cancelModal}
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                {okModal}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ModalComponent;