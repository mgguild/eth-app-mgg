import { MAINNET_CHAIN_ID } from 'config'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address, chainID = MAINNET_CHAIN_ID): string => {
  return address[chainID]
}

export const getCakeAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(tokens.cake.address, chainID)
}
export const getMasterChefAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.masterChef, chainID)
}
export const getMulticallAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.multiCall, chainID)
}
export const getWbnbAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(tokens.wbnb.address, chainID)
}
export const getLotteryAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.lottery, chainID)
}
export const getLotteryTicketAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.lotteryNFT, chainID)
}
export const getLotteryV2Address = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.lotteryV2, chainID)
}
export const getPancakeProfileAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.pancakeProfile, chainID)
}
export const getPancakeRabbitsAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.pancakeRabbits, chainID)
}
export const getBunnyFactoryAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.bunnyFactory, chainID)
}
export const getClaimRefundAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.claimRefund, chainID)
}
export const getPointCenterIfoAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.pointCenterIfo, chainID)
}
export const getBunnySpecialAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.bunnySpecial, chainID)
}
export const getTradingCompetitionAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.tradingCompetition, chainID)
}
export const getEasterNftAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.easterNft, chainID)
}
export const getCakeVaultAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.cakeVault, chainID)
}
export const getPredictionsAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.predictions, chainID)
}
export const getChainlinkOracleAddress = (chainID = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.chainlinkOracle, chainID)
}
