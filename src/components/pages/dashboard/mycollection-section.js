import { Box, Flex, Image, Skeleton, Text } from '@chakra-ui/react'
import { ipfsImageLoader } from '~/utils/loader'

export default function MyCollectionSection({
  tokens,
  setSelectedToken,
  imagesLoaded,
  setImagesLoaded,
}) {
  return (
    <Box p={4}>
      {/* Title */}
      <Flex align="center" justify="space-between">
        <Text fontSize="lg" fontWeight="bold">
          My Collection
        </Text>
      </Flex>
      <Box bg="white" w="100%" h="2px" my={4}></Box>
      {/* Image */}
      <Flex
        className="my-collection"
        direction="row"
        align="center"
        gap={6}
        overflowX="auto"
        overflowY="hidden"
        maxWidth="100%"
        whiteSpace="nowrap"
      >
        {tokens.map((tokenId, index) => (
          <Box
            bg="white"
            p={4}
            borderRadius="lg"
            key={`RAFOSE #${tokenId}`}
            onClick={() => setSelectedToken(tokenId)}
            cursor="pointer"
          >
            <Skeleton isLoaded={imagesLoaded[tokenId]}>
              <Image
                src={ipfsImageLoader(`${tokenId}.png`)}
                alt={`RAFOSE #${tokenId}`}
                w={60}
                borderRadius="lg"
                onLoad={() =>
                  setImagesLoaded((prev) => ({ ...prev, [tokenId]: true }))
                }
              />
            </Skeleton>
            <Text align="center" fontWeight="bold" mt={2}>
              {`RAFOSE #${tokenId}`}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
