import { Box, Flex, Grid, Heading, Image } from '@chakra-ui/react'
import collection1 from '~/assets/images/collection1.png'
import collection2 from '~/assets/images/collection2.png'
import collection3 from '~/assets/images/collection3.png'

export default function FeaturedCollectionSection() {
  const featured = [
    {
      alt: 'NFT-1',
      src: collection1,
    },
    {
      alt: 'NFT-2',
      src: collection2,
    },
    {
      alt: 'NFT-3',
      src: collection3,
    },
  ]

  return (
    <Box is="collection" w="full">
      <Flex
        mx="auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        py="16"
        maxW="7xl"
        gap="8"
        px={{ md: 8 }}
      >
        <Heading
          w={{ base: '10/12', lg: '6/12' }}
          px="8"
          py="2"
          textAlign="center"
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight="bold"
          color="#7B39FE"
          borderRadius="md"
        >
          Featured <span style={{ color: '#7B39FE' }}>Collections</span>
        </Heading>
        {/* Collections for Desktop */}
        <Grid
          display={{ base: 'none', lg: 'grid' }}
          templateColumns="repeat(3, 1fr)"
          gap="8"
        >
          {featured.map(({ alt, src }) => (
            <Image
              alt={alt}
              src={src.src}
              w={480}
              h={640}
              borderRadius="lg"
              objectFit="cover"
              key={alt}
            />
          ))}
        </Grid>
        {/* Collections for Mobile and Table */}
        <Flex
          display={{ lg: 'none' }}
          overflowX="scroll"
          flexDirection="row"
          alignItems="start"
          mx="4"
        >
          {featured.map(({ alt, src }) => (
            <Box
              key={alt}
              mr="8"
              w={{ base: '2/3', md: '1/3' }}
              flexShrink="0"
              borderRadius="lg"
              borderColor="gray.200"
            >
              <Image
                alt={alt}
                src={src.src}
                w={405}
                h={528}
                borderRadius="lg"
                objectFit="cover"
                shadow="md"
                _hover={{ shadow: 'xl' }}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}
