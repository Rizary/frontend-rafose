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

export default function ChangeOffchainWalletSection({ isConnected }) {
  const { address } = useAccount()
  const isMounted = useIsMounted()

  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const { data: dataOffchainWallet, isLoading: readOffchainWalletLoading } =
    useContractRead({
      address: RAFOSE,
      abi: RAFOSEABI.abi,
      enabled: !!isConnected && address === adminAddress,
      functionName: 'offchain',
      watch: true,
    })
  const [valueOffchainWallet, setValueOffchainWallet] = useState(
    isMounted
      ? dataOffchainWallet
      : '0x0000000000000000000000000000000000000000'
  )
  useEffect(() => {
    if (dataOffchainWallet) {
      setValueOffchainWallet(dataOffchainWallet)
    }
  }, [dataOffchainWallet])
  const {
    config,
    error: prepareOffchainWalletError,
    isError: isPrepareOffchainWalletError,
  } = usePrepareContractWrite({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    functionName: 'setOffchainWallet',
    enabled: !!isConnected && isMounted,
    args: [valueOffchainWallet],
  })
  const {
    data: writeOffchainWalletData,
    error: writeOffchainWalletError,
    isError: isWriteOffchainWalletError,
    isLoading: isWriteOffchainWalletLoading,
    write: writeOffchainWallet,
  } = useContractWrite(config)
  const {
    error: OffchainWalletError,
    isOffchainWalletLoading,
    isOffchainWalletError,
  } = useWaitForTransaction({
    hash: writeOffchainWalletData?.hash,
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
        Change Offchain Wallet
      </Text>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          current offchain wallet:
        </Text>
        <Text color={'#D5AA01'}>{valueOffchainWallet}</Text>
      </Flex>
      <Input
        type="text"
        name="treasury-wallet"
        id="treasury-wallet"
        borderColor="#D5AA01"
        textAlign="right"
        placeholder="0x0000000000000000000000000000000000000000"
        isDisabled={readOffchainWalletLoading}
        value={valueOffchainWallet}
        onChange={({ target }) => setValueOffchainWallet(target.value)}
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
          isDisabled={isOffchainWalletLoading || isWriteOffchainWalletLoading}
          onClick={async () => writeOffchainWallet()}
          transition="all 0.2s"
          _hover={{
            borderWidth: '4',
            borderColor: '#D5AA01',
            bg: 'transparent',
            color: '#D5AA01',
          }}
        >
          {isOffchainWalletLoading || isWriteOffchainWalletLoading
            ? 'Loading...'
            : 'Update'}
        </Button>
      </Box>
      {(isPrepareOffchainWalletError ||
        isWriteOffchainWalletError ||
        isOffchainWalletError) && (
        <Text color="red.500">
          Error:{' '}
          {
            (
              prepareOffchainWalletError ||
              writeOffchainWalletError ||
              errorOffchainWallet
            )?.message
          }
        </Text>
      )}
    </>
  )
}
