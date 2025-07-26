import { http } from 'viem'
import { Porto } from 'porto'
import { baseSepolia } from 'porto/Chains'
import type { KeyPair } from '#types.ts'
import type { Hex } from 'ox'

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
  publicKey: '0x00000000000000000000000092437465eb6ef19f20e63e25a416562b384bc793' as `0x${string}`,
  privateKey:
    '0x1d74f48bc9e041679547ee976b0633b7c522fa3f70cedb26714a0c709247cad0',
  type: 'secp256k1' as const,
}

export const serverKeyPair: KeyPair = {
  id: 0,
  created_at: Date.now().toString(),
  address: null, // Account Address Set in /schedule
  public_key: SERVER_KEY.publicKey,
  private_key: SERVER_KEY.privateKey as Hex.Hex,
  type: SERVER_KEY.type,
  role: 'session',
  expiry: 1753539460,
};
