import { Value } from 'ox'

import { usdcConfig } from '#contracts.ts'
import { createPublicClient, http, parseUnits } from 'viem'
import { baseSepolia } from 'viem/chains'

export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ??
  (import.meta.env.DEV
    ? 'http://localhost:6900'
    : 'https://exp-0003-server.evm.workers.dev')

export const SERVER_KEY = {
  address: '0x92437465eb6Ef19f20e63e25A416562b384BC793' as `0x${string}`,
  privateKey:
    '0x1d74f48bc9e041679547ee976b0633b7c522fa3f70cedb26714a0c709247cad0',
  type: 'secp256k1' as const,
}

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http('https://base-sepolia.rpc.ithaca.xyz'),
})

export const permissions = () =>
  ({
    expiry: Math.floor(new Date('2100-01-01').getTime() / 1000), // year 2100
    key: {
      publicKey: SERVER_KEY.address,
      type: SERVER_KEY.type,
    },
    permissions: {
      calls: [
        {
          signature: 'approve(address,uint256)',
          to: usdcConfig.address,
        },
        {
          signature: 'transfer(address,uint256)',
          to: usdcConfig.address,
        },
      ],
      spend: [
        {
          period: 'day',
          limit: parseUnits('50000', usdcConfig.decimals), // 50000 USDC
          token: usdcConfig.address,
        },
      ],
    },
  }) as const
