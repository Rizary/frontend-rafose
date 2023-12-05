import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
} from '@chakra-ui/react'
import { UilTimes } from '@iconscout/react-unicons'
import { useRef } from 'react'

export default function ErrorPopup({ children, title, isOpen, onClose }) {
  const cancelRef = useRef()

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <Box
          m={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          borderColor="red.700"
          bgColor="red.700"
          py={1}
          px={2}
          fontWeight="medium"
          position="relative"
        >
          <Box
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-alert-octagon mx-2 h-6 w-6"
          >
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </Box>
          {title && (
            <AlertDialogBody
              fontSize="md"
              p={2}
              fontWeight="medium"
              color="white"
            >
              {title}
            </AlertDialogBody>
          )}
          <Box
            maxW="full"
            flex="initial"
            fontSize="sm"
            fontWeight="normal"
            color="white"
          >
            <p>{children && children}</p>
          </Box>
          <Box position="absolute" top="2" right="2">
            <Button variant="unstyled" onClick={onClose} ref={cancelRef}>
              <UilTimes />
            </Button>
          </Box>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}
