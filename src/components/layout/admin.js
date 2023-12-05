import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { DeFiFooter } from '../footer'
import { DeFiHeader } from '../header'
import { Sidebar } from '../pages/dashboard'

export default function AdminLayout({ children }) {
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const router = useRouter()
  const handleHomeRedirect = () => {
    router.push('/')
  }
  return isMounted ? (
    adminAddress === address ? (
      <div
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <DeFiHeader />
        <Flex direction="column" flex="1">
          <Grid
            templateColumns="repeat(6, 1fr)"
            gap={{ base: '4', lg: '8' }}
            height={'full'}
          >
            <GridItem colSpan={1}>
              <Sidebar />
            </GridItem>
            <GridItem colSpan={5}>{children}</GridItem>
          </Grid>
        </Flex>
        <DeFiFooter />
      </div>
    ) : (
      <Box textAlign="center" mt={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Page not found
        </Text>
        <Button colorScheme="blue" onClick={handleHomeRedirect}>
          Go Back
        </Button>
      </Box>
    )
  ) : null
}
