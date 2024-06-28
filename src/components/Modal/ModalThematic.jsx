import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

function ModalThematic({ isOpen, onOpen, onClose, title, okModal, cancelModal, size, children, footer }) {
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size} placement="center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title || 'Thêm chuyên đề'}</ModalHeader>
                        <ModalBody>
                            {children}
                        </ModalBody>
                        {footer &&
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    {cancelModal}
                                </Button>
                                <Button color="primary" >
                                    {okModal}
                                </Button>
                            </ModalFooter>
                        }


                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ModalThematic;