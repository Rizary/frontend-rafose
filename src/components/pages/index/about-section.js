import { Box, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import aboutLine from '~/assets/images/about-line.png'
import logo from '~/assets/images/logo.png'
import ourCompany from '~/assets/images/our-company.png'
import ourMine from '~/assets/images/our-mine.png'
import ourWork from '~/assets/images/our-work.png'

export default function AboutSection() {
  const items = [
    {
      title: 'Our Work',
      text: 'Brawijaya Kencana Wungu focuses on gold mining operations and supplies raw gold to prominent gold trading companies in Indonesia.',
      img: ourWork.src,
    },
    {
      title: 'Our Company',
      text: 'Led by experienced professionals with extensive expertise in the gold industry, our company operates with the highest standards of professionalism.',
      img: ourCompany.src,
    },
    {
      title: 'Our Client',
      text: 'Situated in Indonesia, our client is companies that doing business activity in gold and silver industries.',
      img: ourMine.src,
    },
  ]
  return (
    <Box id="about" py={16}>
      <Box textAlign="center" mb={8}>
        <Heading as="h2" size="xl" color="#7B39FE" mb={2} fontWeight="bold">
          About
        </Heading>
        <Text fontSize="xl" fontWeight="light">
          PT Brawijaya Kencana Wungu
        </Text>
      </Box>
      <Grid
        templateColumns={{
          base: '1fr',
          md: '1fr 2rem 1fr',
          lg: '1fr 5rem 1fr',
        }}
        gap={8}
        alignItems="center"
        px={16}
      >
        <GridItem>
          <Box textAlign={{ base: 'center', md: 'left' }} mb={[8, 0]}>
            <Image
              src={logo.src}
              alt="Company Logo"
              boxSize={200}
              objectFit="contain"
              mx="auto"
              mb={[8, 0]}
            />
            <Text>
              Founded on March 10, 2021, in Indonesia, PT Brawijaya Kencana
              Wungu (Brawijaya Kencana Wungu) specializes in gold and silver
              mining. With an initial capital of IDR 20,000,000 (twenty million
              Rupiah), Brawijaya Kencana Wungu is dedicated to support gold
              industry in Indonesia.
            </Text>
          </Box>
        </GridItem>
        <Image
          src={aboutLine.src}
          alt="Separated Line"
          maxHeight={160}
          mx="auto"
        />

        <GridItem>
          {items.map(({ title, text, img }) => (
            <Grid
              templateColumns="auto 1fr"
              columnGap={4}
              rowGap={2}
              mb={4}
              key={title}
            >
              <Image src={img} alt={title} boxSize={68} objectFit="contain" />
              <Box>
                <Heading as="h4" size="lg" fontWeight="bold">
                  {title}
                </Heading>
                <Text>{text}</Text>
              </Box>
            </Grid>
          ))}
        </GridItem>
      </Grid>
    </Box>
  )
}
