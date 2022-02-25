import { useEffect, useState } from 'react'
import { SPARKSWAP_API, API_ASSETS, API_SUMMARY, API_LIQUIDITY, API_LASTPRICE } from 'config'
import useWeb3 from 'hooks/useWeb3'
import BigNumber from 'bignumber.js/bignumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { useWeb3React } from '@web3-react/core'

export const useTokenPrice = (tokenAddress: string) => {
  const MoralisWeb3Api = useMoralisWeb3Api()
  const { chainId } = useWeb3React()
  console.log('useTokenPrice')
  let chainName: 'eth' | 'ropsten' | 'bsc' | 'bsc testnet' = 'eth'
  switch (chainId) {
    case 1:
      chainName = 'eth'
      break
    case 3:
      chainName = 'ropsten'
      break
    case 56:
      chainName = 'bsc'
      break
    case 97:
      chainName = 'bsc testnet'
      break
    default:
      chainName = 'eth'
      break
  }

  const [tokenPrice, setTokenPrice] = useState(0)
  const web3 = useWeb3()

  let _tokenAddress
  try {
    if (tokenAddress === undefined) throw new Error('Token address undefined')
    _tokenAddress = web3.utils.toChecksumAddress(tokenAddress)
  } catch {
    console.error('Invalid staking and reward address')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await MoralisWeb3Api.token.getTokenPrice({ chain: chainName, address: _tokenAddress })
        const _tokenPrice = result.usdPrice

        setTokenPrice(_tokenPrice)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [setTokenPrice, _tokenAddress, MoralisWeb3Api, chainName])

  return { tokenPrice }
}

export const usePoolPrice = (stakingTokenAddress: string, rewardTokenAddress: string) => {
  const MoralisWeb3Api = useMoralisWeb3Api()
  const { chainId } = useWeb3React()
  let chainName: 'eth' | 'ropsten' | 'bsc' | 'bsc testnet' = 'eth'
  switch (chainId) {
    case 1:
      chainName = 'eth'
      break
    case 3:
      chainName = 'ropsten'
      break
    case 56:
      chainName = 'bsc'
      break
    case 97:
      chainName = 'bsc testnet'
      break
    default:
      chainName = 'eth'
      break
  }

  const [stakingPrice, setStakingPrice] = useState(0)
  const [rewardPrice, setRewardPrice] = useState(0)

  const web3 = useWeb3()
  let _stakingTokenAddress
  let _rewardTokenAddress
  try {
    _stakingTokenAddress = web3.utils.toChecksumAddress(stakingTokenAddress)
    _rewardTokenAddress = web3.utils.toChecksumAddress(rewardTokenAddress)
  } catch {
    console.error('Invalid staking and reward address')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result
        result = await MoralisWeb3Api.token.getTokenPrice({ chain: chainName, address: _stakingTokenAddress })
        const _stakingTokenPrice = result.usdPrice

        result = await MoralisWeb3Api.token.getTokenPrice({ chain: chainName, address: _rewardTokenAddress })
        const _rewardTokenPrice = result.usdPrice

        setStakingPrice(_stakingTokenPrice)
        setRewardPrice(_rewardTokenPrice)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [setStakingPrice, setRewardPrice, _stakingTokenAddress, _rewardTokenAddress, MoralisWeb3Api, chainName])

  return { stakingPrice, rewardPrice }
}

const networkFinder = (networkId: number) => {
  switch (networkId) {
    case 1:
      return 'eth'
    case 3:
      return 'ropsten'
    case 56:
      return 'bsc'
    case 97:
      return 'bsc testnet'
    default:
      return 'eth'
  }
}

export const useFarmPrice = (
  lpTotalSupply: number,
  token1Address: string,
  token2Address: string,
  rewardTokenAddress: string,
  lpAddress: string,
  isFetchData?: boolean,
) => {
  const MoralisWeb3Api = useMoralisWeb3Api()
  const { chainId } = useWeb3React()
  const chainName = networkFinder(chainId)
  const [LPPrice, setLPPrice] = useState(0)
  const [rewardPrice, setRewardPrice] = useState(0)
  const web3 = useWeb3()
  let _token1Address
  let _token2Address
  let _rewardTokenAddress
  let _lpAddress
  try {
    _token1Address = web3.utils.toChecksumAddress(token1Address)
    _token2Address = web3.utils.toChecksumAddress(token2Address)
    _rewardTokenAddress = web3.utils.toChecksumAddress(rewardTokenAddress)
    _lpAddress = web3.utils.toChecksumAddress(lpAddress)
  } catch {
    console.error('Invalid staking and reward address')
  }

  useEffect(() => {
    const findPrice = async (tokenAddress: string) => {
      const result = await MoralisWeb3Api.token.getTokenPrice({ chain: chainName, address: tokenAddress })
      const price = result.usdPrice
      return price
    }

    const fetchData = async () => {
      try {
        let _totalToken1InPool
        let _totalToken2InPool
        // result = await MoralisWeb3Api.token.getTokenPrice({chain: chainName, address: _token1Address})
        // result = await MoralisWeb3Api.token.getTokenPrice({chain: chainName, address: _token2Address})
        // result = await MoralisWeb3Api.token.getTokenPrice({chain: chainName, address: _rewardTokenAddress})
        const _token1Price = findPrice(_token1Address)
        const _token2Price = findPrice(_token2Address)
        const _rewardTokenPrice = findPrice(_rewardTokenAddress)
        const res = MoralisWeb3Api.account.getTokenBalances({
          chain: chainName,
          address: _lpAddress,
          token_addresses: [_token1Address, _token2Address],
        })
        const data = await Promise.all([_token1Price, _token2Price, _rewardTokenPrice, res])
        const result = data[3]
        if (result[0].token_address.toLowerCase() === _token1Address.toLowerCase()) {
          _totalToken1InPool = getBalanceNumber(new BigNumber(result[0].balance), Number(result[0].decimals))
        } else {
          _totalToken2InPool = getBalanceNumber(new BigNumber(result[0].balance),  Number(result[0].decimals))
        }

        if (result[1].token_address.toLowerCase() === _token1Address.toLowerCase()) {
          _totalToken1InPool = getBalanceNumber(new BigNumber(result[1].balance),  Number(result[1].decimals))
        } else {
          _totalToken2InPool = getBalanceNumber(new BigNumber(result[1].balance), Number(result[1].decimals))
        }

        setLPPrice((_totalToken1InPool * data[0] + _totalToken2InPool * data[1]) / lpTotalSupply)
        setRewardPrice(data[2])
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }
    if (isFetchData) {
      fetchData()
    }
   
   
  }, [
    isFetchData,
    setLPPrice,
    setRewardPrice,
    lpTotalSupply,
    _token1Address,
    _token2Address,
    _rewardTokenAddress,
    _lpAddress,
    chainName,
    MoralisWeb3Api,
  ])

  return { LPPrice, rewardPrice }
}

export default usePoolPrice
