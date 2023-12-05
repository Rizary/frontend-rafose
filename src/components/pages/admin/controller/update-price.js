import RAFOSEABI from '~/contracts/RAFOSE.json'

import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { RAFOSE } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'

export default function UpdatePriceSection({ isConnected }) {
  const { address } = useAccount()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const [value, setValue] = useState(1)

  const { data: dataUSD } = useContractRead({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    enabled: !!isConnected && address === adminAddress,
    functionName: '_usdPrice',
    watch: true,
  })
  const [priceUSD, setPriceUSD] = useState(0)
  useEffect(() => {
    const getCost = async () => {
      const total = await dataUSD
      total && setPriceUSD(Number(BigInt(total) / BigInt(10 ** 8)))
    }
    getCost()
  }, [isConnected, dataUSD])

  const { data: dataETH } = useContractRead({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    enabled: !!isConnected && address === adminAddress,
    functionName: 'getCurrentPrice',
    watch: true,
  })
  const [priceETH, setPriceETH] = useState(0)
  useEffect(() => {
    const getCost = async () => {
      const total = await dataETH
      total &&
        setPriceETH(
          Number((BigInt(total) * BigInt(100)) / BigInt(10 ** 18)) / 100
        )
    }
    getCost()
  }, [isConnected, dataETH])

  const debouncedValue = useDebounce(value, 500)
  const debouncedUSDPrice = useDebounce(priceUSD, 500)
  const debouncedETHPrice = useDebounce(priceETH, 500)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    functionName: 'setUSDPrice',
    args: [parseInt(debouncedValue)],
    enabled: Boolean(debouncedValue),
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <>
      <Text
        as="label"
        htmlFor="villa-price"
        fontSize="xl"
        fontWeight="semibold"
        color="#363755"
      >
        Update NFT Price
      </Text>
      <Flex direction="row" justifyContent="space-between">
        <Text color="#363755">Current USD price: </Text>
        <Text px={2} fontWeight="bold" color="#363755">
          {debouncedUSDPrice}
        </Text>
      </Flex>
      <Flex direction="row" justifyContent="space-between">
        <Text color="#363755">Current ETH price: </Text>
        <Text px={2} fontWeight="bold" color="#363755">
          {debouncedETHPrice}
        </Text>
      </Flex>
      <Input
        type="number"
        name="price"
        id="price"
        disabled={!write || isLoading || isWriteLoading}
        borderColor="#5BD3C7"
        borderRadius="md"
        p="2"
        paddingRight="2"
        textAlign="right"
        placeholder="1"
        min={1}
        onChange={({ target }) => setValue(target.value)}
      />
      <Flex direction="row" justifyContent="flex-end">
        <Button
          bg="#D5AA01"
          textColor="white"
          w="100%"
          borderWidth={2}
          borderRadius="lg"
          borderColor="#D5AA01"
          fontSize="md"
          fontWeight="medium"
          disabled={!write || isLoading || isWriteLoading}
          onClick={async () => write()}
          transition="all 0.2s"
          _hover={{
            borderWidth: '4',
            borderColor: '#D5AA01',
            bg: 'transparent',
            color: '#D5AA01',
          }}
        >
          {isLoading || isWriteLoading ? 'Loading...' : 'Update'}
        </Button>
        {(isPrepareError || isWriteError || isError) && (
          <Text color="red.500">
            Error: {(prepareError || writeError || error)?.message}
          </Text>
        )}
      </Flex>
    </>
  )
}
