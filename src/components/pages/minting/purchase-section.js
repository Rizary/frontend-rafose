import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Hide,
  Link,
  Show,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import RAFOSEABI from '~/contracts/RAFOSE.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { RAFOSE } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'

export default function PurchaseSection() {
  const [sliderValue, setSliderValue] = useState(0)
  const [sliderFinalValue, setSliderFinalValue] = useState(0)
  const [checkedItems, setCheckedItems] = useState(false)
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()

  const { data: currentPrice } = useContractRead({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    enabled: !!isConnected,
    watch: true,
    functionName: 'getCurrentPrice',
  })

  const [itemPrice, setItemPrice] = useState(0)
  useEffect(() => {
    const getItemPrice = async () => {
      const pc = await currentPrice
      isConnected &&
        pc &&
        setItemPrice(
          (
            parseFloat(ethers.utils.formatEther(currentPrice)) + 0.001
          ).toPrecision(2)
        )
    }
    getItemPrice()
  }, [isConnected, currentPrice])

  const { data: publicMinting } = useContractRead({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    enabled: !!isConnected,
    functionName: 'publicMintingEnabled',
    watch: true,
  })
  const debouncedMinting = useDebounce(publicMinting, 500)

  const { data: presaleAmount } = useContractRead({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    enabled: !!isConnected,
    functionName: 'getAux',
    args: [address],
    watch: true,
  })
  const debouncedPresaleAmount = useDebounce(presaleAmount?.toNumber(), 500)

  return (
    <Box
      h="100vh"
      w="100%"
      bgColor="#FFFAF5"
      p={6}
      borderTopRadius={{ md: '3xl' }}
    >
      <Flex
        direction={{ base: 'column', md: 'column' }}
        justify="center"
        gap={{ base: '0', md: '8', lg: '16' }}
        px={{ base: '0', md: '8', lg: '16' }}
      >
        <Box flex="1">
          {debouncedPresaleAmount > 0 ? (
            <PresaleHeader
              isConnected
              isChecked={Boolean(checkedItems)}
              presaleAmount={debouncedPresaleAmount}
              setSliderValue={setSliderValue}
              setSliderFinalValue={setSliderFinalValue}
            />
          ) : (
            <PublicHeader
              isConnected
              debouncedMinting={debouncedMinting}
              isChecked={Boolean(checkedItems)}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              setSliderFinalValue={setSliderFinalValue}
            />
          )}
          {/* Description */}
          <Box display="grid" gap={3}>
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={4}
            >
              <Text>Cost per NFT (ETH)</Text>
              <Flex align="center" gap={8}>
                <Text>:</Text>
                <Text>{itemPrice}</Text>
              </Flex>
            </Box>
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={4}
            >
              <Text>Total Price </Text>
              <Flex align="center" gap={8}>
                <Text>:</Text>
                <Text>{sliderValue * itemPrice}</Text>
              </Flex>
            </Box>
            <Flex align="center" gap={8} my={4}>
              <Checkbox
                colorScheme="green"
                onChange={(e) => setCheckedItems(e.target.checked)}
              >
                <Link href="https://docs.proudcamel.com/project-background/introduction">
                  Agree to terms and conditions.
                </Link>
              </Checkbox>
            </Flex>
            <Flex align="center" direction={{ base: 'column' }}>
              {debouncedPresaleAmount > 0 ? (
                <PresaleButton
                  finalAmount={sliderFinalValue}
                  ether={ethers.utils.parseEther(
                    (sliderFinalValue * itemPrice).toString()
                  )}
                  isConnected
                  isChecked={Boolean(checkedItems)}
                  isMounted={isMounted}
                />
              ) : (
                <PublicMintButton
                  isConnected
                  debouncedMinting={debouncedMinting}
                  isChecked={Boolean(checkedItems)}
                  finalAmount={sliderFinalValue}
                  ether={ethers.utils.parseEther(
                    (sliderFinalValue * itemPrice).toString()
                  )}
                  isMounted={isMounted}
                />
              )}
              {checkedItems ? null : (
                <Box>
                  <Text color="red">
                    Please agree to the terms and conditions by checking the
                    box.
                  </Text>
                </Box>
              )}
              {/* Benefit */}
              <Box
                borderRadius="md"
                p={{ md: '6' }}
                bgColor={{ md: '#FFFAF5' }}
                display="grid"
                justifyContent="center"
                gap={4}
                my={{ base: '4', md: '0' }}
              >
                <Box display="flex" alignItems="center" gap={4}>
                  <CheckIcon color="#D5AA01" />
                  <Text color="#808080">5,000 RAFOSE</Text>
                </Box>
                <Box display="flex" alignItems="center" gap={4}>
                  <CheckIcon color="#D5AA01" />
                  <Text color="#808080">
                    Specialized content in Discord server
                  </Text>
                </Box>
                <Box display="flex" alignItems="center" gap={4}>
                  <CheckIcon color="#D5AA01" />
                  <Text color="#808080">Access to future airdrops</Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

const PresaleButton = ({
  isMounted,
  isChecked,
  isConnected,
  finalAmount,
  ether,
}) => {
  const { address } = useAccount()
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    functionName: 'presale',
    enabled: ether > 0 && isMounted && !!isConnected,
    overrides: {
      value: ether,
    },
    args: [finalAmount],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write: mintNFT,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })
  return (
    <>
      <Hide above="sm">
        <Box my={4}>
          <Button
            bgGradient="linear(to-r, #1D1801, #D5AA01 90%)"
            textColor="white"
            w="100%"
            px={4}
            py={2}
            borderRadius="lg"
            my={4}
            isDisabled={!(isChecked && isConnected)}
            onClick={async () => mintNFT()}
            _hover={{
              background: 'white',
              color: 'teal.500',
              textColor: 'teal.500',
              border: '1px',
              borderColor: '#D5AA01',
            }}
          >
            Presale
          </Button>
        </Box>
      </Hide>

      <Show above="sm">
        <Box my={8} display="flex" justifyContent="center" gap={6}>
          <Button
            bgGradient="linear(to-r, #1D1801, #D5AA01 90%)"
            textColor="white"
            w="full"
            px={4}
            py={2}
            isDisabled={!(isChecked && isConnected)}
            onClick={async () => mintNFT()}
            borderRadius="lg"
            _hover={{
              background: 'white',
              color: 'teal.500',
              textColor: 'teal.500',
              border: '1px',
              borderColor: '#D5AA01',
            }}
          >
            Presale
          </Button>
        </Box>
      </Show>
    </>
  )
}

const PresaleHeader = ({
  sliderValue,
  presaleAmount,
  setSliderValue,
  setSliderFinalValue,
}) => {
  return (
    <>
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
          Your Presale Amount
        </Text>
        <Text
          my={2}
          textColor="#292929"
          fontWeight="bold"
          fontSize="6xl"
          align="center"
        >
          {presaleAmount}
        </Text>
      </Box>
      {/* Slider */}
      <Flex direction={{ base: 'column', md: 'column' }} align="center" gap={6}>
        <Slider
          flex={{ md: 'auto', lg: '1' }}
          aria-label="slider-purchase"
          defaultValue={0}
          step={1}
          min={0}
          max={presaleAmount}
          onChange={(value) => {
            setSliderValue(value)
          }}
          onChangeEnd={(value) => {
            setSliderFinalValue(value)
          }}
        >
          {[...Array(presaleAmount)].map((x, i) => (
            <SliderMark
              key={i + 1}
              value={i + 1}
              mt="1"
              ml="-2.5"
              fontSize="sm"
            >
              {i + 1}
            </SliderMark>
          ))}

          <SliderTrack bg="white" borderWidth={1} borderColor="#009D4A">
            <SliderFilledTrack bg="#009D4A" />
          </SliderTrack>
          <SliderThumb boxSize={4} bg="#009D4A" />
        </Slider>
        <Text color="#292929" my={4}>
          Quantity [max : {presaleAmount} per transaction]
        </Text>
      </Flex>
    </>
  )
}

const PublicMintButton = ({
  isChecked,
  debouncedMinting,
  isConnected,
  sliderValue,
  finalAmount,
  isMounted,
  ether,
}) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    functionName: 'publicMint',
    enabled: ether > 0 && isMounted && !!isConnected && debouncedMinting,
    overrides: {
      value: ether,
    },
    args: [finalAmount],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write: mintNFT,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <>
      <Hide above="sm">
        <Box my={4}>
          <Button
            bgGradient="linear(to-r, #1D1801, #D5AA01 90%)"
            textColor="white"
            w="100%"
            px={4}
            py={2}
            borderRadius="lg"
            my={4}
            isDisabled={!(isChecked && isConnected && debouncedMinting)}
            onClick={async () => mintNFT()}
            _hover={{
              background: 'white',
              color: '#D5AA01',
              border: '1px',
              borderColor: '#D5AA01',
            }}
          >
            {debouncedMinting ? 'Purchase' : 'Minting Disabled'}
          </Button>
        </Box>
      </Hide>

      <Show above="sm">
        <Box my={8} display="flex" justifyContent="center" gap={6}>
          <Button
            bgGradient="linear(to-r, #1D1801, #D5AA01 90%)"
            textColor="white"
            w="full"
            px={4}
            py={2}
            isDisabled={!(isChecked && isConnected && debouncedMinting)}
            onClick={async () => mintNFT()}
            borderRadius="lg"
            _hover={{
              background: 'white',
              color: '#D5AA01',
              border: '1px',
              borderColor: '#D5AA01',
            }}
          >
            {debouncedMinting ? 'Purchase' : 'Minting Disabled'}
          </Button>
        </Box>
      </Show>
    </>
  )
}

const PublicHeader = ({
  presaleAmount,
  sliderValue,
  setSliderValue,
  setSliderFinalValue,
}) => {
  return (
    <>
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
      {/* Slider */}
      <Flex direction={{ base: 'column', md: 'column' }} align="center" gap={6}>
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
          <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
            0
          </SliderMark>
          <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
            2
          </SliderMark>
          <SliderMark value={4} mt="1" ml="-2.5" fontSize="sm">
            4
          </SliderMark>
          <SliderMark value={6} mt="1" ml="-2.5" fontSize="sm">
            6
          </SliderMark>
          <SliderMark value={8} mt="1" ml="-2.5" fontSize="sm">
            8
          </SliderMark>
          <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
            10
          </SliderMark>
          <SliderTrack bg="white" borderWidth={1} borderColor="#009D4A">
            <SliderFilledTrack bg="#009D4A" />
          </SliderTrack>
          <SliderThumb boxSize={4} bg="#009D4A" />
        </Slider>
        <Text color="#292929" my={4}>
          Quantity [max : 10 per transaction]
        </Text>
      </Flex>
    </>
  )
}
