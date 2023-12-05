import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

export default function UnitsModal({ children, title, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="full"
      isCentered
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent width="80%" height="80%">
        {title && (
          <ModalHeader>
            <Box
              alignItems="center"
              justifyContent="space-between"
              p={2}
              px={4}
              display={['flex', 'none']}
            >
              <Text> RAFOSE #{title}</Text>
            </Box>
            <hr />
          </ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          <Box width="100%" height="100%">
            {children}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
