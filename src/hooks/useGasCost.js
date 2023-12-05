import { useEffect, useState } from 'react'
import { useFeeData } from 'wagmi'

// returns the gas cost of a transaction in ETH
// config is what is returned by wagmi's `usePrepareContractWrite` hook
export const useGasCost = (config) => {
  const [gasCost, setGasCost] = useState(0)
  const { data } = useFeeData({
    formatUnits: 'gwei',
    watch: true,
  })
  const dataMaxFeePerGas = data?.maxFeePerGas
  useEffect(() => {
    if (config && config.request) {
      const gasLimit = parseInt(config.request.gasLimit)
      const maxFeePerGas = parseFloat(dataMaxFeePerGas)
      const gasCost = gasLimit * maxFeePerGas
      setGasCost(round(gasCost / 10 ** 9, 9))
    }
  }, [config, dataMaxFeePerGas])

  return { gasCost }
}

function round(value, decimals) {
  return Math.round(parseFloat(value) * 10 ** decimals) / 10 ** decimals
}
