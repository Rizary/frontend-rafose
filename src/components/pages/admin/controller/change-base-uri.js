import RAFOSEABI from '~/contracts/RAFOSE.json'

import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { RAFOSE } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'

export default function ChangeBaseURISection({ isConnected, address }) {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const isMounted = useIsMounted()

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    functionName: 'setBaseURI',
    enabled: isMounted && !!isConnected && address === adminAddress,
    args: [debouncedValue],
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
        htmlFor="treasury-wallet"
        fontSize="xl"
        fontWeight="semibold"
        color="#363755"
      >
        Change Base URI
      </Text>
      <Input
        type="text"
        name="treasury-wallet"
        id="treasury-wallet"
        borderColor="#5BD3C7"
        textAlign="right"
        placeholder="https://nft..com"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <Box display="flex" justifyContent="flex-end">
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
      </Box>
      {(isPrepareError || isWriteError || isError) && (
        <Text color="red.500">
          Error: {(prepareError || writeError || error)?.message}
        </Text>
      )}
    </>
  )
}
