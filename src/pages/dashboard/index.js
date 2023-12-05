import { Box, Button, Flex, GridItem, Text, VStack } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead, useNetwork } from 'wagmi'
import DeFiLayout from '~/components/layout/defi'
import {
  AttributesSection,
  FeatureSection,
  MyCollectionSection,
} from '~/components/pages/dashboard'
import RAFOSEABI from '~/contracts/RAFOSE.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { RAFOSE } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'
import { LoadingLayer } from '~/utils/loading-layer'

export default function Dapps() {
  const [tokens, setTokens] = useState([])
  const [dynamicArgs, setDynamicArgs] = useState([])
  const [imagesLoaded, setImagesLoaded] = useState({})

  const router = useRouter()
  const { address, isConnected } = useAccount()
  const isMounted = useIsMounted()
  const { data: dataBalanceNFT } = useContractRead({
    abi: RAFOSEABI.abi,
    address: RAFOSE,
    enabled: isMounted && isConnected,
    functionName: 'balanceOf',
    args: [address],
  })

  const [totalNFT, setTotalNFT] = useState(0)
  useEffect(() => {
    if (dataBalanceNFT) {
      setTotalNFT(dataBalanceNFT)
    }
  }, [dataBalanceNFT])

  const debouncedDynamicArgs = useDebounce(dynamicArgs, 300)

  const { data: tokensOfOwnerData } = useContractRead({
    abi: RAFOSEABI.abi,
    address: RAFOSE,
    enabled: isMounted && debouncedDynamicArgs.length > 0,
    functionName: 'tokensOfOwnerIn',
    watch: true,
    args: debouncedDynamicArgs,
  })

  useEffect(() => {
    async function fetchTokens() {
      if (address && dataBalanceNFT) {
        const balance = dataBalanceNFT.toNumber()
        const chunkSize = 100
        let fetchedTokens = []

        for (let i = 0; i < Math.ceil(balance / chunkSize); i++) {
          const start = i * chunkSize
          const stop = start + chunkSize
          setDynamicArgs([address, start, stop])

          await new Promise((resolve) => {
            if (tokensOfOwnerData) {
              resolve()
            }
          })

          if (tokensOfOwnerData) {
            const convertedTokens = tokensOfOwnerData.map((token) =>
              token.toNumber()
            )
            fetchedTokens = [...fetchedTokens, ...convertedTokens]
            if (fetchedTokens.length >= balance) {
              break
            }
          }
        }

        setTokens(fetchedTokens.slice(0, balance))
      }
    }

    fetchTokens()
  }, [address, dataBalanceNFT, tokensOfOwnerData])

  const handleMintingRedirect = () => {
    router.push('/minting')
  }

  useEffect(() => {
    if (address) {
      setSelectedToken(0)
    }
  }, [address])

  const [selectedToken, setSelectedToken] = useState(0)
  const [attrLoaded, setAttrLoaded] = useState(false)
  useEffect(() => {
    if (tokens.length > 0 && (selectedToken === 0 || address)) {
      setSelectedToken(tokens[0])
    }
  }, [tokens, selectedToken, address])

  const { chains, chain } = useNetwork()
  // Check if the user is in the correct network
  const supportedChains = chains.map(({ id }) => id)
  const [isWrongNetwork, setIsWrongNetwork] = useState(
    !supportedChains.includes(chain?.id)
  )

  useEffect(() => {
    setIsWrongNetwork(!supportedChains.includes(chain?.id))
  }, [supportedChains, chain])
  return (
    <>
      {!isMounted ? (
        <LoadingLayer />
      ) : !isConnected ? (
        <>
          <Flex
            direction="column"
            mt={8}
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Connect your Metamask wallet and make sure you are in the right
              network
            </Text>
            <ConnectButton />
          </Flex>
        </>
      ) : totalNFT > 0 ? (
        <>
          <Box px={4} maxWidth={'100%'} bg="white" display="block">
            <GridItem borderRadius="lg" bg="#FFFAF5">
              <MyCollectionSection
                tokens={tokens}
                setSelectedToken={setSelectedToken}
                imagesLoaded={imagesLoaded}
                setImagesLoaded={setImagesLoaded}
              />
            </GridItem>

            <VStack
              alignItems="stretch"
              justifyContent="space-between"
              my={4}
              spacing={{ base: 4, md: 4 }}
            >
              <Box borderRadius="lg" bg="#FFFAF5">
                {tokens.length > 0 && selectedToken ? (
                  <FeatureSection selectedToken={selectedToken} />
                ) : (
                  <></>
                )}
              </Box>
              <Box borderRadius="lg" bg="#FFFAF5">
                {tokens.length > 0 && selectedToken ? (
                  <AttributesSection
                    selectedToken={selectedToken}
                    setAttrLoaded={setAttrLoaded}
                  />
                ) : (
                  <></>
                )}
              </Box>
            </VStack>
          </Box>
          {!attrLoaded && <LoadingLayer />}
        </>
      ) : (
        <Box textAlign="center" mt={8}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            You do not have any NFTs, please purchase in the minting section
            below
          </Text>
          <Button
            bgGradient="linear(to-r, #1D1801, #D5AA01 90%)"
            textColor="white"
            borderWidth={2}
            borderRadius="lg"
            borderColor="#D5AA01"
            fontSize="md"
            fontWeight="medium"
            transition="all 0.2s"
            _hover={{
              borderWidth: '4',
              borderColor: '#D5AA01',
              bg: 'transparent',
              color: '#D5AA01',
            }}
            onClick={handleMintingRedirect}
          >
            Mint Now!!
          </Button>
        </Box>
      )}
    </>
  )
}

Dapps.getLayout = function getLayout(page) {
  return <DeFiLayout>{page}</DeFiLayout>
}
