// import { externalPools } from './external_pools'
import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    mainPool: true,
    sousId: 9,
    stakingToken: tokens.mgg,
    earningToken: tokens.mgg,
    contractAddress: {
      97: '',
      56: '',
      1: '',
      3: '0xF8a9146047B7B7B48483125343fC00A1585ed1e1'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '100000000000000000000',
    sortOrder: 999,
    isFinished: false,
    chainId: 3
  },
]

export default pools
