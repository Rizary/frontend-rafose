import { Heading, VStack } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import AdminLayout from '~/components/layout/admin'
import Airdrop from '~/components/pages/admin/controller/airdrop'
import ChangeBaseURISection from '~/components/pages/admin/controller/change-base-uri'
import ChangeOffchainWalletSection from '~/components/pages/admin/controller/change-offchain-wallet'
import ChangeOnchainWalletSection from '~/components/pages/admin/controller/change-onchain-wallet'
import EnableDisableMintingSection from '~/components/pages/admin/controller/enable-disable-minting'
import UpdatePriceSection from '~/components/pages/admin/controller/update-price'
import Whitelist from '~/components/pages/admin/controller/whitelist'
export default function ControllerPage() {
  const { address, isConnected } = useAccount()

  return (
    <VStack w="full" spacing="8" borderRadius="md" bg="#FFFAF5" p="4">
      {/* Title */}
      <Heading fontSize="2xl" fontWeight="bold" color="#0D0D0D">
        Controller
      </Heading>
      {/* Form */}
      <VStack w="full" spacing="8" xl={{ w: '8/12' }}>
        {/* Update Price */}
        <VStack spacing="4">
          <UpdatePriceSection isConnected={isConnected} />
        </VStack>
        {/* Enable/Disable Minting*/}
        <VStack spacing="4">
          <EnableDisableMintingSection isConnected={isConnected} />
        </VStack>
        Send Airdrop
        <VStack spacing="4">
          <Airdrop />
        </VStack>
        {/* Change Onchain Wallet */}
        <VStack spacing="4">
          <ChangeOnchainWalletSection isConnected={isConnected} />
        </VStack>
        {/* Change Offchain Wallet */}
        <VStack spacing="4">
          <ChangeOffchainWalletSection isConnected={isConnected} />
        </VStack>
        {/* Change Base URI */}
        <VStack spacing="4">
          <ChangeBaseURISection isConnected={isConnected} address={address} />
        </VStack>
        {/* Add Whitelist address */}
        <VStack spacing="4">
          <Whitelist isConnected={isConnected} address={address} />
        </VStack>
      </VStack>
    </VStack>
  )
}

ControllerPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>
}
