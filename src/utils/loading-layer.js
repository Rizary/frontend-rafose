import { Center, Image, Text } from '@chakra-ui/react'
import logo from '~/assets/images/logo.png'

export const LoadingLayer = ({
  text = 'Loading...',
  spinnerSize = 'lg',
  spinnerColor = 'blue.500',
  zIndex = 1,
  display = 'flex',
  ...props
}) => {
  return (
    <Center
      minHeight="80vh"
      flexDirection="column"
      zIndex={zIndex}
      display={display}
      {...props}
    >
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        {text}
      </Text>
      <Image
        src={logo.src}
        alt="Loading..."
        boxSize={spinnerSize}
        className="rotate"
        layout="fill"
        borderRadius="sm"
        height={240}
        width={320}
      />
    </Center>
  )
}
