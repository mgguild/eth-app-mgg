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
  // OWN - BNB - OWN
  {
    pid: 251,
    lpSymbol: 'SRKb-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xD581CdF609DD50fbaa25118583c6EE31b39662F9',
    },
    stakingAddresses: {
      97: '',
      56: '0xCec445174D6f4e87d38d43d4b13E36dd55CC56A1',
    },
    token: tokens.srkb,
    pairToken: tokens.wbnb,
    quoteToken: tokens.srkb,
  },
  {
    pid: 252,
    lpSymbol: 'SRKb-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xD581CdF609DD50fbaa25118583c6EE31b39662F9',
    },
    stakingAddresses: {
      97: '',
      56: '0xCec445174D6f4e87d38d43d4b13E36dd55CC56A1',
    },
    token: tokens.srkb,
    pairToken: tokens.wbnb,
    quoteToken: tokens.srkb,
  },

  /**
   * EXTERNAL STAKING POOLS
   */
  {
    pid: 259,
    lpSymbol: 'SRK-ETH LP',
    lpAddresses: {
      97: '',
      56: '',
      3: '0xc4332e188dc102ae650c63943fe0ca4f2c395abf',
      1: '',
    },
    stakingAddresses: {
      97: '',
      56: '',
      3: '0xed01ddb7ee062d33d88d0af8f5252b4041610a52',
      1: '',
    },
    token: tokens.srkb,
    pairToken: tokens.eth,
    quoteToken: tokens.srkb,
    isPromoted: 1,
    chain: '3'
  },

]

export default farms
