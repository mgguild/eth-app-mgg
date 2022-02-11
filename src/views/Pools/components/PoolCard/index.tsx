import BigNumber from 'bignumber.js'
import React, { useContext, useEffect, useState } from 'react'
import { CardBody, Flex, Text, Link, LinkExternal } from '@sparkpointio/sparkswap-uikit'
import { ThemeContext } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import { PoolCategory } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { usePoolPrice } from 'hooks/price'
import { getPoolApr } from 'utils/apr'
import { getBscScanAddressUrl, getEthScanAddressUrl } from 'utils/bscscan'
import { Pool } from 'state/types'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import { getPoolBlockInfo } from 'views/Pools/helpers'
import { useBlock } from 'state/block/hooks'
import { getBscScanLink, getEthScanLink } from 'utils'
import DetailsSection from 'views/Farms/components/FarmCard/DetailsSection'
import { StyledCard, StyledCardInner } from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'
import { getAddress } from '../../../../utils/addressHelpers'
import ClaimAction from '../ClaimAction'

const PoolCard: React.FC<{ pool: Pool; account: string }> = ({ pool, account }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    isFinished,
    userData,
    startBlock,
    endBlock,
    isComingSoon,
    stakingTokenPrice,
    poolCategory,
  } = pool
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)
  const theme = useContext(ThemeContext)
  const totalStaked = pool.totalStaked
    ? getBalanceNumber(new BigNumber(pool.totalStaked.toString()), stakingToken.decimals)
    : 0

  const rewardPerBlock = pool?.tokenPerBlock
    ? getBalanceNumber(new BigNumber(pool.tokenPerBlock.toString()), earningToken.decimals)
    : 0

  const temp = new BigNumber(pool.tokenPerBlock).times(new BigNumber(userData.stakedBalance).div(pool.totalStaked))
  const rewardRate = pool?.tokenPerBlock ? getBalanceNumber(temp) : 0

  const { currentBlock } = useBlock()

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  const { stakingPrice, rewardPrice } = usePoolPrice(getAddress(stakingToken.address), getAddress(earningToken.address))
  const rate = rewardRate ? formatNumber(rewardRate, 2, 10) : '-'
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const apr = getPoolApr(stakingPrice, rewardPrice, totalStaked, rewardPerBlock)
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const isLoading = !userData

  return (
    <StyledCard isFinished={isFinished && sousId !== 0}>
      <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished && sousId !== 0}
      />
      <Flex style={{ margin: '24px' }} flexDirection="column" justifyContent="space-evenly">
        <Flex>
          <ClaimAction
            stakingTokenBalance={stakingTokenBalance}
            isBnbPool={isBnbPool}
            pool={pool}
            stakingTokenPrice={stakingTokenPrice}
          />
        </Flex>
        <Flex justifyContent="space-between" style={{ textAlign: 'left' }}>
          <Text>Duration</Text>
          <Link
            external
            href={
              chainId === 56 || chainId === 97
                ? getBscScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')
                : getEthScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')
            }
          >
            <Text color="textSubtle">
              {!isComingSoon && `${formatNumber(blocksRemaining, 0, 0)}`} {isComingSoon && '-'} blocks
            </Text>
          </Link>
        </Flex>

        {/* <AprRow pool={pool} stakingTokenPrice={stakingTokenPrice} /> */}
        {/* <Flex justifyContent="space-between" style={{textAlign: 'left'}}>
            <Text>Total Deposit</Text>
            <Text>{!isComingSoon && `${ formatNumber(totalStaked) }`} {isComingSoon && '-'} {stakingToken.symbol}</Text>
          </Flex> */}
        {/* <Flex justifyContent="space-between" style={{textAlign: 'left'}}>
              <Text>Reward per block</Text>
              <Text>{!isComingSoon && rewardPerBlock} {isComingSoon && '-'}</Text>
          </Flex> */}
        <Flex justifyContent="space-between" style={{ textAlign: 'left' }}>
          <Text>{t('Rate')}</Text>
          <Text>
            {!isComingSoon ? rate : '-'} {pool.earningToken.symbol}/block
          </Text>
        </Flex>
        <Flex mt="24px" flexDirection="column" marginTop="10px">
          {account ? (
            <CardActions pool={pool} stakedBalance={stakedBalance} />
          ) : (
            <>
              <UnlockButton />
            </>
          )}
        </Flex>
        {/* <Text color="textSubtle" fontSize="14px">{t('This will only work on Binance Smart Chain')}</Text> */}
        {/* <CardFooter pool={pool} account={account} /> */}
        <DetailsSection
          stakingAddress={
            chainId === 56 || chainId === 97
              ? getBscScanAddressUrl(pool.contractAddress[chainId])
              : getEthScanAddressUrl(pool.contractAddress[chainId])
          }
          lpInfoAddress=""
        />
      </Flex>
    </StyledCard>
  )
}

export default PoolCard
