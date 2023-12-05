import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import logo from '~/assets/images/logo.png'
import { ipfsDetailsLoader } from '~/utils/loader'

export default function AttributesSection({ selectedToken, setAttrLoaded }) {
  const [dataAttributes, setDataAttributes] = useState([])

  useEffect(() => {
    async function getNFTs() {
      try {
        setAttrLoaded(false)
        const response = await fetch(ipfsDetailsLoader(selectedToken))
        const newData = await response.json()
        setDataAttributes(newData.attributes)
        setAttrLoaded(true)
      } catch (error) {
        console.error('Error fetching data:', error)
        setAttrLoaded(false)
      }
    }

    if (selectedToken) {
      getNFTs()
    }
  }, [selectedToken, setAttrLoaded])

  return (
    <Box p={4}>
      {/* Title */}
      <Text fontSize="xl" fontWeight="bold">
        Attributes
      </Text>
      <Box bg="white" w="100%" h="2px" my={4}></Box>
      {/* Card Attributes */}
      <Stack>
        {dataAttributes.map(({ trait_type, value }) => (
          <Box bg="white" shadow="md" borderRadius="lg" p={4} key={trait_type}>
            <Flex direction="row" align="center" justify="space-between">
              <Flex direction="row" align="center" gap={2}>
                <Image
                  src={logo.src}
                  alt="Sample"
                  w={16}
                  h={12}
                  borderRadius="sm"
                />
                <Text>{trait_type}</Text>
              </Flex>
              <Flex direction="row" align="center" gap={2}>
                <Text>{value}</Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
