import { Grid } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { LandingFooter } from '../footer'
import { LandingHeader } from '../header'

export default function LandingLayout({ children }) {
  const { isConnected } = useAccount()

  return (
    <Grid
      templateRows="auto 1fr auto"
      minHeight="100vh"
      width="100%"
      backgroundColor="#FFF"
    >
      <LandingHeader isConnected={isConnected} />
      <main>{children}</main>
      <LandingFooter />
    </Grid>
  )
}
