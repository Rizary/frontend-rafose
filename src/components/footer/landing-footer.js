import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import {
  UilDiscord,
  UilInstagram,
  UilMediumM,
  UilTwitter,
} from '@iconscout/react-unicons'
import logo from '~/assets/images/logo.png'

export default function LandingFooter() {
  return (
    <Box as="footer" id="contact" px={4} py={8} aria-label="Site Footer">
      {/* Gradient Line */}
      <Box
        h="1px"
        background="linear-gradient(to right, #1D1801, #D5AA01 90%)"
      />
      <Box maxW="7xl" mx="auto" w="full">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={{ base: 4, md: 4, lg: 12 }}
          px={16}
        >
          <GridItem>
            <Flex
              direction="column"
              spacing={16}
              justifyContent="space-between"
            >
              <Link href="/" _hover={{ textDecoration: 'none' }}>
                <Image src={logo.src} alt="Logo" w={80} h="auto" />
              </Link>
              <Text minWidth="25%">
                Kencana Wungu NFT, Gold Industry-Backed Digital Assets
              </Text>
              <Flex
                alignItems="center"
                spacing={2}
                justifyContent="space-between"
                maxWidth="80%"
              >
                <Link href="#">
                  <UilTwitter color="#D5AA01" size={25} />
                </Link>
                <Link href="#">
                  <UilInstagram color="#D5AA01" size={25} />
                </Link>
                <Link href="#">
                  <UilMediumM color="#D5AA01" size={25} />
                </Link>
                <Link href="#">
                  <UilDiscord color="#D5AA01" size={25} />
                </Link>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem my={{ base: 4, md: 8 }}>
            <Heading
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="semibold"
              color="#363755"
              my={2}
            >
              Sitemap
            </Heading>
            <Flex
              mb={6}
              spacing={{ base: 4, md: 8 }}
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="semibold"
              color="#363755"
              justifyContent="space-between"
            >
              <Link href="/" _hover={{ textDecoration: 'none' }}>
                Home
              </Link>
              <Link href="#about" _hover={{ textDecoration: 'none' }}>
                About
              </Link>
              <Link href="#team" _hover={{ textDecoration: 'none' }}>
                Team
              </Link>
              <Link href="#roadmap" _hover={{ textDecoration: 'none' }}>
                Roadmap
              </Link>
              <Link href="#community" _hover={{ textDecoration: 'none' }}>
                Community
              </Link>
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Text>© Copyright 2022 Kencana Wungu. All Rights Reserved</Text>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}
