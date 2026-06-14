import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

interface ConfirmDeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title?: string;
  message?: string;
}

export function ConfirmDeleteAlert({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting,
  title = "Confirmer la suppression",
  message = "Êtes-vous sûr ? Cette action est irréversible."
}: ConfirmDeleteAlertProps) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay backdropFilter="blur(4px)" bg="blackAlpha.400">
        <AlertDialogContent borderRadius="20px" overflow="hidden" boxShadow="0 20px 40px rgba(0,0,0,0.1)">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" borderBottom="1px solid" borderColor="gray.100" py={5}>
            {title}
          </AlertDialogHeader>
          <AlertDialogBody py={6}>
            {message}
          </AlertDialogBody>
          <AlertDialogFooter borderTop="1px solid" borderColor="gray.100" bg="gray.50">
            <Button ref={cancelRef} onClick={onClose} isDisabled={isDeleting} borderRadius="12px">
              Annuler
            </Button>
            <Button 
              colorScheme="red" 
              onClick={onConfirm} 
              ml={3} 
              isLoading={isDeleting}
              borderRadius="12px"
              boxShadow="0 4px 14px 0 rgba(245,101,101,0.39)"
            >
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
