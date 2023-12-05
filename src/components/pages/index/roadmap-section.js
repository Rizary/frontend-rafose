import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import map from '~/assets/images/map.png'
import roadmapLine from '~/assets/images/roadmap-line.png'
import roadmap from '~/assets/images/roadmap.png'

export default function RoadMapSection() {
  const roadmapItems = [
    {
      quarter: 'Q3 2023',
      text: 'We expect to sell 1,500 NFTs by the end of Q3 2023, with a discord setup to track the progress of the project.',
    },
    {
      quarter: 'Q4 2023',
      text: 'We start prepare the mine and mining process and expect to sell 3,000 NFTs by the end of Q4 2023.',
    },
    {
      quarter: 'Q1 2024',
      text: 'We start mining and expect to sell 5,000 NFTs by the end of Q1 2024.',
    },
    {
      quarter: 'Q2 2024',
      text: 'We start distributing the mining rewards and involved in NFTs trading activity by the end of Q2 2024.',
    },
  ]

  return (
    <Box id="roadmap" py={16}>
      <VStack mb={8} textAlign="center" spacing={2}>
        <Heading fontSize="4xl" fontWeight="bold" color="#7B39FE">
          Roadmap
        </Heading>
        <Heading fontSize={{ base: 'lg', md: 'xl' }} fontWeight="light">
          Kencana Wungu NFT Roadmap
        </Heading>
      </VStack>
      <Grid
        templateColumns={['1fr', '1fr auto 1fr']}
        gap={8}
        alignItems="center"
        px={16}
      >
        <GridItem>
          <VStack spacing={8}>
            {roadmapItems.map(({ quarter, text }, index) => (
              <HStack
                key={quarter}
                alignItems="start"
                paddingLeft={index % 2 === 1 ? 8 : 0}
              >
                <Image src={roadmap.src} alt={quarter} width={68} height={68} />
                <VStack alignItems="start" spacing={1}>
                  <Heading fontSize="xl" fontWeight="bold">
                    {quarter}
                  </Heading>
                  <Text>{text}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </GridItem>
        <Image
          src={roadmapLine.src}
          alt="Separated Line"
          maxHeight={160}
          mx="auto"
        />
        <GridItem>
          <VStack spacing={8}>
            <Image src={map.src} alt="map" width={400} height={200} />
            <Text textAlign="center">
              Our meticulously crafted roadmap fuses Web3, NFTs, and mining
              operations, ensuring a professional journey that drives mutual
              growth and success for our vibrant community, the mining industry,
              and our dedicated team as we revolutionize the gold sector.
            </Text>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  )
}
