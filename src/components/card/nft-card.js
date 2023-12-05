import { Box, Button, Center, Heading, Image, Stack } from '@chakra-ui/react'
import { ipfsImageLoader } from '~/utils/loader'

export default function NFTCard({ src, title, setIsModalOpened }) {
  return (
    <>
      <Box borderRadius="lg" bg="white">
        <Center borderTopRadius="lg" border="1px" borderColor="#D5AA01">
          <Image
            src={ipfsImageLoader(src)}
            bgSize="cover"
            bgPosition="bottom"
            bgRepeat="no-repeat"
            maxWidth={'160px'}
            alt={title}
          />
        </Center>
        <Stack
          p={4}
          spacing="3"
          textAlign="center"
          bg="#D5AA01"
          textColor="white"
          borderBottomRadius="lg"
        >
          <Heading size="md">{title}</Heading>
        </Stack>
        <Box p={4}>
          <Button onClick={() => setIsModalOpened(true)}>{'More Info'}</Button>
        </Box>
      </Box>
    </>
  )
}
