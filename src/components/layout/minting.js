import { useIsMounted } from '~/hooks/useIsMounted'
import { LoadingLayer } from '~/utils/loading-layer'
import { MintingFooter } from '../footer'
import { MintingHeader } from '../header'

export default function MintingLayout({ children }) {
  const isMounted = useIsMounted()
  return !isMounted ? (
    <LoadingLayer />
  ) : (
    <div>
      <MintingHeader />
      <main>{children}</main>
      <MintingFooter />
    </div>
  )
}
