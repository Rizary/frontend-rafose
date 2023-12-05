import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import wirchainLogo from '~/assets/images/wirchain-logo.jpg'

export default function TeamSection() {
  const bgColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box id="team" py={8} bgColor={bgColor}>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={8}
        alignItems="center"
      >
        {/* First column: Wirchain logo */}
        <Box display="flex" justifyContent="center">
          <Image
            src={wirchainLogo}
            alt="Wirchain Logo"
            width={150}
            height={150}
          />
        </Box>
        {/* Second column: Title and explanation */}
        <VStack alignItems="start" px={8} spacing={4}>
          <Heading fontSize="3xl" fontWeight="bold" color="#7B39FE">
            Our Team
          </Heading>
          <Text color="black">
            Our diverse team is composed of gold industry professionals driven
            to bridge the gap between physical and digital assets. With
            experienced web3 developers passionate about promoting web 3.0
            adoption, and skilled marketing strategists ensuring seamless
            operations, we work together to innovate and excel in the rapidly
            evolving world of digital assets and blockchain technology.
          </Text>
        </VStack>
      </Grid>
    </Box>
  )
}
