import { Button, Input, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { ErrorPopup } from '~/components/modal'
import RAFOSEABI from '~/contracts/RAFOSE.json'
import { useGasCost } from '~/hooks/useGasCost'
import { RAFOSE } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'

export default function Airdrop() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isErrorOpened, setIsErrorOpened] = useState(true)
  const { isConnected, address } = useAccount()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const [airdropAmount, setAirdropAmount] = useState(0)
  const [airdropTo, setAirdropTo] = useState(
    '0x0000000000000000000000000000000000000000'
  )
  const debouncedWhitelistAmount = useDebounce(airdropAmount, 500)
  const debouncedWhitelistTo = useDebounce(airdropTo, 500)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    functionName: 'ownerMint',
    enabled:
      !!isConnected &&
      !!debouncedWhitelistAmount &&
      !!debouncedWhitelistTo &&
      address === adminAddress,
    args: [debouncedWhitelistTo, parseInt(debouncedWhitelistAmount)],
    onError(error) {
      setIsErrorOpened(true)
    },
  })

  const gasCost = useGasCost(config)
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write,
  } = useContractWrite({
    ...config,
    overrides: {
      gasLimit: gasCost,
      gasPrice: gasCost,
    },
  })
  const {
    error: transactionError,
    isLoading,
    isError,
    status,
  } = useWaitForTransaction({
    hash: writeData?.hash,
    onError(error) {
      setIsErrorOpened(true)
    },
  })

  return (
    <>
      <Text fontSize="xl" fontWeight="semibold" color="#363755">
        Airdrop
      </Text>
      <Text color="#363755">Address</Text>
      <Input
        type="text"
        id="wl-to"
        borderColor="#5BD3C7"
        textAlign="right"
        placeholder="0x0000000000000000000000000000000000000000"
        value={airdropTo}
        onChange={({ target }) => setAirdropTo(target.value)}
      />
      <Text fontSize="2xl" fontWeight="bold">
        Amount
      </Text>
      <Input
        type="number"
        id="wl-amount"
        min={1}
        textAlign="right"
        placeholder="10"
        defaultValue={airdropAmount}
        onChange={({ target }) => setAirdropAmount(target.value)}
      />
      <VStack spacing={4}>
        <Button
          bg="#D5AA01"
          textColor="white"
          w="100%"
          borderWidth={2}
          borderRadius="lg"
          borderColor="#D5AA01"
          fontSize="md"
          fontWeight="medium"
          isDisabled={!write || isLoading || isWriteLoading}
          onClick={async () => write()}
          transition="all 0.2s"
          _hover={{
            borderWidth: '4',
            borderColor: '#D5AA01',
            bg: 'transparent',
            color: '#D5AA01',
          }}
        >
          {isLoading || isWriteLoading || status === 'loading'
            ? 'Loading...'
            : 'Airdrop'}
        </Button>
        {(isPrepareError || isWriteError || isError) && (
          <ErrorPopup
            isOpen={isErrorOpened}
            onClose={() => setIsErrorOpened(false)}
            title={'Airdrop Error'}
          >
            There is an error while airdrop. Please try again later.
          </ErrorPopup>
        )}
      </VStack>
    </>
  )
}
