import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react'
import { DiAptana } from 'react-icons/di'
import { FaCube, FaHome, FaTag } from 'react-icons/fa'
import { VscLock } from 'react-icons/vsc'
import { useAccount } from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'

export default function Sidebar() {
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS

  const navItem = [
    {
      icon: <FaHome />,
      label: 'Home',
      route: '/',
    },
    {
      icon: <FaCube />,
      label: 'My NFT',
      route: '/dashboard',
    },
    {
      icon: <FaTag />,
      label: 'Buy NFT',
      route: '/minting',
    },
  ]
  const navAdmin = [
    {
      icon: <VscLock />,
      label: 'All Units',
      route: '/admin',
    },
    {
      icon: <DiAptana />,
      label: 'Controller',
      route: '/admin/controller',
    },
  ]

  return (
    <Box bgColor="#FFFAF5" minHeight="100%" maxHeight="100%" color="#1D1801">
      <Flex direction="column" justifyContent="space-between" height="100%">
        <Stack p={4} spacing={4}>
          {navItem.map(({ icon, label, route }) => (
            <Flex direction="row" align="center" gap={2} key={label}>
              <Link href={route}>
                {icon}
                <Text fontSize="md" fontWeight="semibold">
                  {label}
                </Text>
              </Link>
            </Flex>
          ))}
          {isMounted &&
            isConnected &&
            address === adminAddress &&
            navAdmin.map(({ icon, label, route }) => (
              <Flex direction="row" align="center" gap={2} key={label}>
                <Link href={route}>
                  {icon}
                  <Text fontSize="md" fontWeight="semibold">
                    {label}
                  </Text>
                </Link>
              </Flex>
            ))}
        </Stack>
      </Flex>
    </Box>
  )
}
