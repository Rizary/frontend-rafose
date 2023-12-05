import RAFOSEABI from '~/contracts/RAFOSE.json'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { RAFOSE } from '~/utils/contract-address'

export default function ChangeOnchainWalletSection({ isConnected }) {
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const { data: dataOnchainWallet, isLoading: readOnchainWalletLoading } =
    useContractRead({
      address: RAFOSE,
      abi: RAFOSEABI.abi,
      enabled: !!isConnected && address === adminAddress,
      functionName: 'onchain',
      watch: true,
    })
  const [valueOnchainWallet, setValueOnchainWallet] = useState(
    isMounted ? dataOnchainWallet : '0x0000000000000000000000000000000000000000'
  )
  useEffect(() => {
    if (dataOnchainWallet) {
      setValueOnchainWallet(dataOnchainWallet)
    }
  }, [dataOnchainWallet])

  const {
    config,
    error: prepareOnchainWalletError,
    isError: isPrepareOnchainWalletError,
  } = usePrepareContractWrite({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    functionName: 'setOnchainWallet',
    enabled: !!isConnected && isMounted,
    args: [valueOnchainWallet],
  })
  const {
    data: writeOnchainWalletData,
    error: writeOnchainWalletError,
    isError: isWriteOnchainWalletError,
    isLoading: isWriteOnchainWalletLoading,
    write: writeOnchainWallet,
  } = useContractWrite(config)
  const {
    error: onchainWalletError,
    isOnchainWalletLoading,
    isOnchainWalletError,
  } = useWaitForTransaction({
    hash: writeOnchainWalletData?.hash,
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
        Change Onchain Wallet
      </Text>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          current onchain wallet:
        </Text>
        <Text color={'#D5AA01'}>{valueOnchainWallet}</Text>
      </Flex>
      <Input
        type="text"
        name="treasury-wallet"
        id="treasury-wallet"
        borderColor="#D5AA01"
        textAlign="right"
        placeholder="0x0000000000000000000000000000000000000000"
        isDisabled={readOnchainWalletLoading}
        value={valueOnchainWallet}
        onChange={({ target }) => setValueOnchainWallet(target.value)}
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
          isDisabled={isOnchainWalletLoading || isWriteOnchainWalletLoading}
          onClick={async () => writeOnchainWallet()}
          transition="all 0.2s"
          _hover={{
            borderWidth: '4',
            borderColor: '#D5AA01',
            bg: 'transparent',
            color: '#D5AA01',
          }}
        >
          {isOnchainWalletLoading || isWriteOnchainWalletLoading
            ? 'Loading...'
            : 'Update'}
        </Button>
      </Box>
      {(isPrepareOnchainWalletError ||
        isWriteOnchainWalletError ||
        isOnchainWalletError) && (
        <Text color="red.500">
          Error:{' '}
          {
            (
              prepareOnchainWalletError ||
              writeOnchainWalletError ||
              errorOnchainWallet
            )?.message
          }
        </Text>
      )}
    </>
  )
}
