import {
  Box,
  Collapse,
  Flex,
  Heading,
  Image,
  Link,
  Show,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import logo from '~/assets/images/logo.png'
import RAFOSEABI from '~/contracts/RAFOSE.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { RAFOSE } from '~/utils/contract-address'

export default function MintingHeader() {
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
  console.log(address)
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Flex
        pos="sticky"
        w="100%"
        zIndex={2}
        bgColor="#FFFAF5"
        p={4}
        color="#D5AA01"
        align="center"
        justify="space-between"
      >
        <Flex alignItems="center">
          <Link
            cursor="pointer"
            textDecoration="none"
            href="/"
            _hover={{ textDecoration: 'none' }}
          >
            <Image src={logo.src} alt="Logo" width={32} height={24} />
          </Link>
          <Heading as="p" size="md" pl={4}>
            Kencana Wungu NFT
          </Heading>
        </Flex>
        <Show above="sm">
          <Flex direction="row" align="center" gap={12}>
            <Link href="/">
              <Text>Home</Text>
            </Link>
            {isMounted && isConnected && totalNFT > 0 ? (
              <Link href="/dashboard">
                <Text>Dashboard</Text>
              </Link>
            ) : (
              <></>
            )}
          </Flex>
        </Show>
      </Flex>
      {/* Mobile Nav */}
      <Collapse in={isOpen} animateOpacity>
        <Box p={4} bg="#FFFAF5">
          <Stack spacing={4} my={2}>
            <Link href="/">
              <Text fontWeight="semibold">Home</Text>
            </Link>
            <Box bgColor="#D5AA01" h="1px"></Box>
          </Stack>
        </Box>
      </Collapse>
    </>
  )
}
