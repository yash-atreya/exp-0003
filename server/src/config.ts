import { http } from 'viem'
import { Porto } from 'porto'
import { baseSepolia } from 'porto/Chains'

export type TPorto = ReturnType<typeof getPorto>

export const getPorto = () =>
  Porto.create({
    chains: [baseSepolia],
    transports: {
      [baseSepolia.id]: http(),
    },
  })

export const SERVER_KEY = {
  address: '0x92437465eb6Ef19f20e63e25A416562b384BC793' as `0x${string}`,
  privateKey:
    '0x1d74f48bc9e041679547ee976b0633b7c522fa3f70cedb26714a0c709247cad0',
  type: 'secp256k1' as const,
}
