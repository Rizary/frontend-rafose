import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { DeFiFooter } from '../footer'
import { DeFiHeader } from '../header'
import { Sidebar } from '../pages/dashboard'

export default function DeFiLayout({ children }) {
  return (
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
  )
}
