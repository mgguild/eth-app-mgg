import tokens from './tokens'
import { FarmConfig } from './types'
import { CAKE_INFO_URL, PANCAKE_ADD_LIQUIDITY_URL } from '../index'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  /* {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  */

  /**
   * INTERNAL STAKING POOLS
   */

  /**
   * EXTERNAL STAKING POOLS
   */
  {
    pid: 260,
    lpSymbol: 'MGG-ETH LP',
    lpAddresses: {
      97: '',
      56: '',
      3: '0xd787da7db25da0b6afde5dba1508b85947a95807',
      1: '',
    },
    stakingAddresses: {
      97: '',
      56: '',
      3: '0x0623D68625e24f2Aa30dC12b27Ce85Ba547540B6',
      1: '',
    },
    token: tokens.mgg,
    pairToken: tokens.eth,
    quoteToken: tokens.mgg,
    isPromoted: 1,
    chain: '3'
  },
  // {
  //   pid: 259,
  //   lpSymbol: 'BHC-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x19e3cd6418d81d69a71b3fc931387a2062c5a815',
  //   },
  //   stakingAddresses: {
  //     97: '',
  //     56: '0xD314dbD9998401770943EcdBE97f78Ea2f0dEE62',
  //   },
  //   token: tokens.bhc,
  //   pairToken: tokens.busd,
  //   quoteToken: tokens.bhc,
  //   isPromoted: 1
  // },

]

export default farms
