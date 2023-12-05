import {
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useContractEvent } from 'wagmi'
import { MintingLayout } from '~/components/layout'
import {
  HeroSection,
  PurchaseSection,
  ResultSection,
} from '~/components/pages/minting'
import RAFOSEABI from '~/contracts/RAFOSE.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { RAFOSE } from '~/utils/contract-address'
import { LoadingLayer } from '~/utils/loading-layer'

export default function MintingPage() {
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState(1)
  const [tokenBought, setTokenBought] = useState([])
  const handleTab = (index) => {
    setActiveTab(index)
  }

  useEffect(() => {
    isConnected
      ? tokenBought.length > 0
        ? setActiveTab(3)
        : setActiveTab(2)
      : setActiveTab(1)
  }, [isConnected, isMounted, tokenBought])

  useContractEvent({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    enabled: !!isConnected && isMounted,
    eventName: 'Transfer',
    watch: true,
    listener: (from, to, tokenId) => {
      if (address === to) {
        setTokenBought((prevTokenIds) => [...prevTokenIds, tokenId.toNumber()])
      }
    },
  })

  return (
    <div>
      {!isMounted ? <LoadingLayer /> : <></>}
      <Tabs
        index={activeTab - 1}
        onChange={(index) => setActiveTab(index + 1)}
        isLazy
        lazyBehavior="keepMounted"
        display={isMounted ? 'block' : 'none'}
      >
        <TabList>
          <Flex justifyContent="space-around" w="full">
            <Tab isDisabled={activeTab !== 1}>
              <Stack
                direction="row"
                align="center"
                spacing={4}
                cursor="default"
              >
                <Flex
                  bg="#D5AA01"
                  w={8}
                  h={8}
                  textColor="white"
                  justify="center"
                  align="center"
                  borderRadius="lg"
                >
                  1
                </Flex>
                <Stack direction="column" spacing={0}>
                  <Text fontWeight="semibold">CONNECT</Text>
                  <Text>wallet and check network</Text>
                </Stack>
              </Stack>
            </Tab>
            <Tab isDisabled={activeTab !== 2}>
              <Stack
                direction="row"
                align="center"
                spacing={4}
                cursor="default"
              >
                <Flex
                  bg="#D5AA01"
                  w={8}
                  h={8}
                  textColor="white"
                  justify="center"
                  align="center"
                  borderRadius="lg"
                >
                  2
                </Flex>
                <Stack direction="column" spacing={0}>
                  <Text fontWeight="semibold">CHECKOUT</Text>
                  <Text>quantity and mint</Text>
                </Stack>
              </Stack>
            </Tab>
            <Tab isDisabled={activeTab !== 3}>
              <Stack
                direction="row"
                align="center"
                spacing={4}
                cursor="default"
              >
                <Flex
                  bg="#D5AA01"
                  w={8}
                  h={8}
                  textColor="white"
                  justify="center"
                  align="center"
                  borderRadius="lg"
                >
                  3
                </Flex>
                <Stack direction="column" spacing={0}>
                  <Text fontWeight="semibold">REVIEW</Text>
                  <Text>receipt</Text>
                </Stack>
              </Stack>
            </Tab>
          </Flex>
        </TabList>

        <TabPanels>
          <TabPanel>{isMounted && activeTab === 1 && <HeroSection />}</TabPanel>
          <TabPanel>
            {isMounted && activeTab === 2 && <PurchaseSection />}
          </TabPanel>
          <TabPanel>
            {isMounted && activeTab === 3 && tokenBought.length > 0 && (
              <ResultSection tokenBought={tokenBought} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

MintingPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
