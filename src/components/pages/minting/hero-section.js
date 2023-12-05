import { Box, Center, Hide, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { useDebounce } from '~/utils/debounce'

export default function HeroSection() {
  const isMounted = useIsMounted()
  const { chains, chain } = useNetwork()
  const { address, isConnected } = useAccount()

  // Check if the user is in the correct network
  const supportedChains = chains.map(({ id }) => id)
  const [isWrongNetwork, setIsWrongNetwork] = useState(
    !supportedChains.includes(chain?.id)
  )

  useEffect(() => {
    setIsWrongNetwork(!supportedChains.includes(chain?.id))
  }, [supportedChains, chain])

  // Get the balance
  const debouncedAddress = useDebounce(address, 500)
  return (
    <Box h="100vh" bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
      <Text
        fontSize="3xl"
        align="center"
        fontWeight="bold"
        textColor="#292929"
        mb={6}
      >
        Are You Ready?
      </Text>

      {!!isWrongNetwork && isMounted ? (
        <Text align="center" mb={8} textColor="#292929">
          Connect your Metamask wallet and make sure you are in the right
          network
        </Text>
      ) : (
        <Text align="center" mb={8} textColor="#292929">
          You are in the wrong network
        </Text>
      )}

      <Center mb={8}>
        <ConnectButton />
      </Center>
      <Hide below="lg">
        <Center my={6}>
          <Text align="center" w="80%">
            You will need to have Ether on the {process.env.NEXT_PUBLIC_CHAIN}{' '}
            network to mint the NFT.
          </Text>
        </Center>
      </Hide>
    </Box>
  )
}
