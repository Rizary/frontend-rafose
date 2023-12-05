import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { FaDiscord, FaInstagram, FaMediumM, FaTwitter } from 'react-icons/fa'

export default function CommunitySection() {
  return (
    <Box
      id="community"
      mx="auto"
      mt={8}
      w="full"
      maxW="7xl"
      py={16}
      px={{ base: 8, md: 16 }}
      align="center"
    >
      <Flex justifyContent="center" minWidth="75%" gap={16} px={8} mb={8}>
        <Link href="#">
          <Box
            bg="#D5AA01"
            p={4}
            borderRadius="full"
            boxShadow="0px 10px 30px rgba(20, 184, 166, 0.3)"
            cursor="pointer"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.1)' }}
          >
            <FaTwitter size={32} />
          </Box>
        </Link>
        <Link href="#">
          <Box
            bg="#D5AA01"
            p={4}
            borderRadius="full"
            boxShadow="0px 10px 30px rgba(20, 184, 166, 0.3)"
            cursor="pointer"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.1)' }}
          >
            <FaInstagram size={32} />
          </Box>
        </Link>
        <Link href="#">
          <Box
            bg="#D5AA01"
            p={4}
            borderRadius="full"
            boxShadow="0px 10px 30px rgba(20, 184, 166, 0.3)"
            cursor="pointer"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.1)' }}
          >
            <FaMediumM size={32} />
          </Box>
        </Link>
        <Link href="#">
          <Box
            bg="#D5AA01"
            p={4}
            borderRadius="full"
            boxShadow="0px 10px 30px rgba(20, 184, 166, 0.3)"
            cursor="pointer"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.1)' }}
          >
            <FaDiscord size={32} />
          </Box>
        </Link>
      </Flex>
      <Box px={4} mb={6}>
        <Heading as="h1" size="xl" mb={4} color="#7B39FE" textAlign="center">
          Join Our Community
        </Heading>
        <Text>
          Be part of our NFT 3.0 revolution in the gold industry! Connect with
          like-minded individuals and stay updated on the latest in blockchain
          and NFTs. Let us shape the future together.
        </Text>
      </Box>
    </Box>
  )
}
