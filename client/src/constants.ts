import { Value } from 'ox'

import { exp1Config } from '#contracts.ts'
import { createPublicClient, http } from 'viem'
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
    expiry: Math.floor(Date.now() / 1_000) + 60 * 60 * 24, // 1 day
    key: {
      publicKey: SERVER_KEY.address,
      type: SERVER_KEY.type,
    },
    permissions: {
      calls: [
        {
          signature: 'approve(address,uint256)',
          to: exp1Config.address,
        },
        {
          signature: 'transfer(address,uint256)',
          to: exp1Config.address,
        },
        {
          signature: 'mint()',
          to: exp1Config.address,
        },
      ],
      spend: [
        {
          period: 'minute',
          limit: Value.fromEther('1000'),
          token: exp1Config.address,
        },
      ],
    },
  }) as const
