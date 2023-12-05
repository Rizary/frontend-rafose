import ContractAddress from '~/contracts/address.json'

export const RAFOSE =
  process.env.NEXT_PUBLIC_CHAIN === 'sepolia'
    ? ContractAddress.sepolia.RAFOSE
    : ContractAddress.mainnet.RAFOSE

export const truncate = (address) => {
  const match = address.match(/^(0x[a-zA-Z0-9])[a-zA-Z0-9]+([a-zA-Z0-9])$/)
  return match
    ? `0x${address.slice(2, 6)}…${address.slice(address.length - 4)}`
    : address
}
