import { ArrowUpDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Hide,
  Image,
  Link,
  Show,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { ipfsDetailsLoader, ipfsImageLoader } from '~/utils/loader'
import { LoadingLayer } from '~/utils/loading-layer'

export default function ResultSection({ tokenBought, handleTab }) {
  const [selected, setSelected] = useState(tokenBought[0])
  const [imagesLoaded, setImagesLoaded] = useState({})
  const [detailsLoaded, setDetailsLoaded] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState({})
  useEffect(() => {
    async function getNFTs() {
      try {
        const response = await fetch(ipfsDetailsLoader(selected))

        const newData = await response.json()
        return newData
      } catch (error) {
        console.error('Error fetching data:', error)
        return {}
      }
    }

    setIsLoading(true)
    getNFTs().then((response) => {
      setData(response)
      setIsLoading(false)
      setDetailsLoaded(true)
    })
  }, [selected])

  const handleDetail = (id) => {
    setSelected(id)
    setDetailsLoaded(false)
  }
  const allImagesLoaded =
    Object.keys(imagesLoaded).length === tokenBought.length

  useEffect(() => {
    if (detailsLoaded && allImagesLoaded) {
      setInitialLoading(false)
    }
  }, [detailsLoaded, allImagesLoaded])

  return (
    <>
      <Box
        px={{ base: '6', lg: '12' }}
        py={6}
        bgColor={{ base: '#FFFAF5', md: 'white' }}
        borderTopRadius={{ md: '3xl' }}
      >
        <Text
          fontWeight="bold"
          align={'center'}
          fontSize="3xl"
          color="#292929"
          mb={6}
        >
          Your Purchases
        </Text>
        <Divider />
        {initialLoading && <LoadingLayer />}
        <Box display={initialLoading ? 'none' : 'block'}>
          {isLoading && <LoadingLayer />}
          {!initialLoading && !isLoading && (
            <DetailsNFTSelected data={data} selected={selected} />
          )}
          <Divider />
          <ImageResult
            tokenBought={tokenBought}
            handleDetail={handleDetail}
            imagesLoaded={imagesLoaded}
            setImagesLoaded={setImagesLoaded}
          />
        </Box>
        <Flex justify="center" my={6}>
          <Link as={NextLink} href="/dashboard">
            <Button
              bg="#D5AA01"
              textColor="white"
              w="100%"
              borderRadius="lg"
              my={4}
              px={8}
              py={6}
              _hover={{
                background: 'white',
                color: '#D5AA01',
                border: '1px',
                borderColor: '#D5AA01',
              }}
            >
              Dashboard
            </Button>
          </Link>
        </Flex>
      </Box>
    </>
  )
}

const DetailsNFTSelected = ({ data }) => {
  const { edition, attributes = [] } = data
  return (
    <>
      {/* NFT */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="start"
        justify="start"
        gap={{ md: '6', lg: '0' }}
      >
        <Box>
          <Image
            src={ipfsImageLoader(`${edition}.png`)}
            alt="Sample"
            w={400}
            borderRadius="2xl"
            p={8}
          />
        </Box>
        <Flex direction="column" justify="left" p={8}>
          {/* Title */}
          <Box>
            <Text fontWeight="bold" fontSize="3xl" color="#292929">
              RAFOSE #{edition}
            </Text>
          </Box>
          <Divider />

          {/* Table Traits */}
          <Hide above="sm">
            <Box maxWidth="75%">
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead bgGradient="#D5AA01">
                    <Tr>
                      <Th colSpan={3} p={4} borderTopRadius="lg">
                        <Flex direction="row" align="center" gap={2}>
                          <Text
                            color="white"
                            fontSize="xl"
                            fontWeight="semibold"
                          >
                            TRAITS
                          </Text>
                          <Text color="white">
                            ({data.attributes.length} Categories)
                          </Text>
                        </Flex>
                      </Th>
                    </Tr>
                  </Thead>
                  {data.attributes.map((attr, index) => (
                    <Tbody key={index}>
                      <Tr bg={index % 2 === 0 ? '#FFFAF5' : 'white'}>
                        <Td>{attr.trait_type}</Td>
                        <Td>{attr.value}</Td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>
              </TableContainer>
            </Box>
          </Hide>

          {/* Table Desktop */}
          <Show above="md">
            <TableContainer maxWidth="100%">
              <Table>
                <Thead bg="#D5AA01">
                  <Tr>
                    <Th colSpan={4} p={4} borderTopRadius="lg">
                      <Flex direction="row" align="center" gap={2}>
                        <Text color="white" fontSize="xl" fontWeight="semibold">
                          TRAITS
                        </Text>
                        <Text color="white">
                          ({data.attributes.length} Categories)
                        </Text>
                      </Flex>
                    </Th>
                  </Tr>
                </Thead>
                <Thead>
                  <Tr>
                    <Th>
                      <Flex direction="row" align="center" gap={2}>
                        <Text fontSize="md" fontWeight="semibold">
                          TYPE
                        </Text>
                        <ArrowUpDownIcon />
                      </Flex>
                    </Th>
                    <Th>
                      <Flex direction="row" align="center" gap={2}>
                        <Text fontSize="md" fontWeight="semibold">
                          VALUE
                        </Text>
                        <ArrowUpDownIcon />
                      </Flex>
                    </Th>
                  </Tr>
                </Thead>
                {data.attributes.map((attr, index) => (
                  <Tbody key={index}>
                    <Tr bg={index % 2 === 0 ? '#FFFAF5' : 'white'}>
                      <Td>{attr.trait_type}</Td>
                      <Td>{attr.value}</Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </TableContainer>
          </Show>
        </Flex>
      </Flex>
    </>
  )
}

const ImageResult = ({
  tokenBought,
  handleDetail,
  imagesLoaded,
  setImagesLoaded,
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      gap={4}
      my={4}
      maxWidth="100%"
      overflowX="auto"
    >
      {tokenBought.map((tokenId) => (
        <>
          <Hide above="sm">
            <Flex maxWidth="100%" overflowX="auto" gap={6}>
              <Skeleton isLoaded={imagesLoaded[tokenId]}>
                <Image
                  src={ipfsImageLoader(`${tokenId}.png`)}
                  alt="Sample"
                  w={200}
                  borderRadius="2xl"
                  onLoad={() =>
                    setImagesLoaded((prev) => ({ ...prev, [tokenId]: true }))
                  }
                />
              </Skeleton>
            </Flex>
          </Hide>
          <Show above="md">
            <Flex
              direction="row"
              align="center"
              gap={3}
              justify="space-between"
              my={12}
              maxWidth="100%"
              overflowX="auto"
            >
              <Skeleton isLoaded={imagesLoaded[tokenId]}>
                <Image
                  src={ipfsImageLoader(`${tokenId}.png`)}
                  alt="Sample"
                  w={200}
                  borderRadius="2xl"
                  onClick={() => handleDetail(tokenId)}
                  onLoad={() =>
                    setImagesLoaded((prev) => ({ ...prev, [tokenId]: true }))
                  }
                />
              </Skeleton>
            </Flex>
          </Show>
        </>
      ))}
    </Flex>
  )
}
