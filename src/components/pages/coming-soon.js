import { Box, ChakraProvider, Heading, Text, VStack } from '@chakra-ui/react'

export default function ComingSoon() {
  return (
    <ChakraProvider>
      <Box bg="gray.100" minH="100vh">
        <VStack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          minH="100vh"
        >
          <Heading as="h1" size="2xl" color="teal.500">
            RAFOSE
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Coming Soon! Bridging Web 2.0 and Web 3.0 for an innovative future.
          </Text>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}
