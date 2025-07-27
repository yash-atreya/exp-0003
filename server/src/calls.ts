import { AbiFunction, type Address, Value } from 'ox'

import { exp1Config, usdcConfig } from '#contracts.ts'

export const actions = ['mint', 'approve-transfer']

export function buildActionCall({
  action,
  account,
}: {
  action: string
  account: Address.Address
}) {
  // if (action === 'mint') {
  //   return <const>[
  //     {
  //       to: exp1Config.address,
  //       data: AbiFunction.encodeData(
  //         AbiFunction.fromAbi(exp1Config.abi, 'mint'),
  //         [account, Value.fromEther('1')],
  //       ),
  //     },
  //   ]
  // }

  if (action === 'approve-transfer') {
    return <const>[
      {
        to: usdcConfig.address,
        data: AbiFunction.encodeData(
          AbiFunction.fromAbi(usdcConfig.abi, 'approve'),
          [account, Value.from('1', usdcConfig.decimals)],
        ),
      },
      {
        to: usdcConfig.address,
        data: AbiFunction.encodeData(
          AbiFunction.fromAbi(usdcConfig.abi, 'transfer'),
          [
            '0x7EdD735a3959E7FD981473a4dd2FC87265C08217',
            Value.from('1', usdcConfig.decimals),
          ],
        ),
      },
    ]
  }

  return <const>[
    { to: '0x7EdD735a3959E7FD981473a4dd2FC87265C08217', value: '0x0' },
    { to: '0x7EdD735a3959E7FD981473a4dd2FC87265C08217', value: '0x0' },
  ]
}
