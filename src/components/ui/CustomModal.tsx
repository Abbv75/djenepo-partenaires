import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react';

interface CustomModalProps extends Omit<React.ComponentProps<typeof Modal>, 'children' | 'isOpen' | 'onClose'> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  hideFooter?: boolean;
}

export function CustomModal({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  isSubmitting = false,
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  hideFooter = false,
  size = 'xl',
  ...rest
}: CustomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} {...rest}>
      <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.400" />
      <ModalContent 
        as={onSubmit ? "form" : "div"} 
        onSubmit={onSubmit}
        borderRadius="20px"
        overflow="hidden"
        boxShadow="0 20px 40px rgba(0,0,0,0.1)"
      >
        <ModalHeader borderBottom="1px solid" borderColor="gray.100" py={5}>
          {title}
        </ModalHeader>
        <ModalCloseButton mt={2} borderRadius="full" _hover={{ bg: 'gray.100' }} />
        
        <ModalBody py={6}>
          {children}
        </ModalBody>

        {!hideFooter && (
          <ModalFooter borderTop="1px solid" borderColor="gray.100" py={4} bg="gray.50">
            <Button 
              onClick={onClose} 
              mr={3} 
              variant="ghost" 
              isDisabled={isSubmitting}
              borderRadius="12px"
            >
              {cancelLabel}
            </Button>
            <Button 
              colorScheme="green" 
              type={onSubmit ? "submit" : "button"} 
              isLoading={isSubmitting}
              borderRadius="12px"
              boxShadow="0 4px 14px 0 rgba(72,187,120,0.39)"
            >
              {submitLabel}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
