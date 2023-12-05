import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDebounce } from '~/utils/debounce'

export default function WhitelistSection({ handleTab }) {
  const [sliderValue, setSliderValue] = useState(0)
  const [sliderFinalValue, setSliderFinalValue] = useState(0)
  const debouncedFinalValue = useDebounce(sliderFinalValue, 500)
  return (
    <Box
      h="100vh"
      w="100%"
      bgColor="#FFFAF5"
      p={6}
      borderTopRadius={{ md: '3xl' }}
    >
      <Box>
        {/* Title */}
        <Text textColor="#D5AA01" align="center" mb={4}>
          SELECT QUANTITY
        </Text>
        {/* Amount */}
        <Text
          textColor="#292929"
          fontWeight="bold"
          fontSize="3xl"
          align="center"
        >
          How Many?
        </Text>
        <Text
          my={2}
          textColor="#292929"
          fontWeight="bold"
          fontSize="6xl"
          align="center"
        >
          {sliderValue}
        </Text>
      </Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        gap={{ base: '0', md: '8', lg: '16' }}
        px={{ base: '0', md: '8', lg: '16' }}
      >
        <Box flex="1">
          {/* Slider */}
          <Flex
            direction={{ base: 'column', md: 'row-reverse' }}
            align="center"
            gap={6}
          >
            <Slider
              flex={{ md: 'auto', lg: '1' }}
              aria-label="slider-purchase"
              defaultValue={0}
              step={1}
              min={0}
              max={10}
              onChange={(value) => {
                setSliderValue(value)
              }}
              onChangeEnd={(value) => {
                setSliderFinalValue(value)
              }}
            >
              <SliderTrack bg="white" borderWidth={1} borderColor="#009D4A">
                <SliderFilledTrack bg="#009D4A" />
              </SliderTrack>
              <SliderThumb boxSize={4} bg="#009D4A" />
            </Slider>
            <Text color="#292929" my={4}>
              Quantity [max : 10 per transaction]
            </Text>
          </Flex>
          {/* Description */}
          <Box display="grid" gap={3}>
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={4}
            >
              <Text>Cost per NFT (USDC)</Text>
              <Flex align="center" gap={8}>
                <Text>:</Text>
                <Text>0.025</Text>
              </Flex>
            </Box>
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={4}
            >
              <Text>Total Base Price </Text>
              <Flex align="center" gap={8}>
                <Text>:</Text>
                <Text>0.000</Text>
              </Flex>
            </Box>
            <Flex align="center" gap={8} my={4}>
              <CheckIcon color="#D5AA01" />
              <Text>Agree term and condition</Text>
            </Flex>
            <Center>
              <Button
                bgColor="white"
                border="2px"
                borderColor="#D5AA01"
                textColor="#292929"
                w="100%"
                px={8}
                py={6}
              >
                Purchase
              </Button>
            </Center>
          </Box>
        </Box>
        {/* Benefit */}
        <Box
          borderRadius="md"
          p={{ md: '6' }}
          bgColor={{ md: 'white' }}
          display="grid"
          justifyContent="center"
          gap={4}
          my={{ base: '4', md: '0' }}
        >
          <Box display="flex" alignItems="center" gap={4}>
            <CheckIcon color="#D5AA01" />
            <Text color="#808080">0 Optimistic Bunnies</Text>
          </Box>
          <Box display="flex" alignItems="center" gap={4}>
            <CheckIcon color="#D5AA01" />
            <Text color="#808080">0 Pixelated Bunnies</Text>
          </Box>
          <Box display="flex" alignItems="center" gap={4}>
            <CheckIcon color="#D5AA01" />
            <Text color="#808080">Specialized content in Discord server</Text>
          </Box>
          <Box display="flex" alignItems="center" gap={4}>
            <CheckIcon color="#D5AA01" />
            <Text color="#808080">Access to future airdrops</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
