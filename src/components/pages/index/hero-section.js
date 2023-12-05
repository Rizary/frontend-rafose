import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import followersCount from '~/assets/images/followers-count.png'
import heroBackground from '~/assets/images/hero-background.png'
import nftCount from '~/assets/images/nft-count.png'

export default function HeroSection({}) {
  const { isConnected, address } = useAccount()

  const counters = [
    {
      src: nftCount.src,
      key: '1',
      value: 'Gold Industry',
    },
    {
      src: followersCount.src,
      key: '5,000',
      value: 'NFTs',
    },
  ]

  return (
    <Box id="home" w="full">
      <Flex mx="auto" h="screen" maxW="100%" flexGrow={1}>
        <Box position="relative" flexGrow={1}>
          <Image
            src={heroBackground.src}
            alt="Hero"
            objectFit="cover"
            maxWidth="100%"
            h={{ base: '60vh', md: '100vh' }}
          />
          {/* Heading */}
          <Flex
            position="absolute"
            inset="0"
            zIndex="10"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing="4" textAlign="center">
              <Heading
                color="#FFF"
                fontSize={{ base: '2xl', lg: '5xl' }}
                fontWeight="bold"
              >
                Kencana Wungu NFT,
                <br />
                <span style={{ color: '#FFC000' }}>
                  Gold Industry-Backed Digital Assets
                </span>
              </Heading>
              <Heading
                color="#FFF"
                fontSize={{ base: 'md', lg: '3xl' }}
                fontWeight="medium"
              >
                Invest in the Future of Gold Mining with Blockchain Technology
              </Heading>
              {/* Enter App button */}

              <HStack spacing={{ base: 8, md: 4 }} pt="8" flexDirection={'row'}>
                <Link href="/dashboard">
                  <Button
                    bgGradient="linear(to-r, #1D1801, #D5AA01 90%)"
                    textColor="white"
                    w="100%"
                    borderWidth={2}
                    borderRadius="lg"
                    borderColor="#D5AA01"
                    fontSize="md"
                    fontWeight="medium"
                    transition="all 0.2s"
                    _hover={{
                      borderWidth: '4',
                      borderColor: '#D5AA01',
                      bg: 'transparent',
                      color: 'white',
                    }}
                  >
                    Enter App
                  </Button>
                </Link>
                <Button
                  borderRadius="md"
                  borderWidth={2}
                  borderColor="#D5AA01"
                  bg="transparent"
                  px={{ base: 6, md: 4 }}
                  py={2}
                  fontSize="md"
                  fontWeight="medium"
                  color="white"
                  transition="all 0.2s"
                  onClick={() =>
                    (window.location.href = 'https://docs.kencanawungu.com')
                  }
                  _hover={{
                    borderColor: 'transparent',
                    bg: '#D5AA01',
                    color: 'white',
                  }}
                >
                  Read Whitepaper
                </Button>
              </HStack>
            </VStack>
          </Flex>
        </Box>
      </Flex>
      {/* Counters */}
      <Box mx="auto" py={{ base: 4, md: 16 }}>
        <Flex w="full" alignItems="center" justifyContent="end">
          <Flex w="full" flexDirection={'row'} justifyContent="center">
            {counters.map(({ src, key, value }) => (
              <Flex
                key={key}
                flexDirection="column"
                alignItems="center"
                spacing="16"
                textAlign="center"
              >
                <Box maxW={64} px={16}>
                  <Image src={src} alt="icon" width={24} />
                </Box>
                <Box fontSize="xl" fontWeight="bold" color="black">
                  {key}
                </Box>
                <Box>{value}</Box>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
