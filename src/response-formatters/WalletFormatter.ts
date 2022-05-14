import IFormatter from './IFormatter'
import { tokenizer } from '../lib/helpers'

const template = `
Your wallet:
{{ data }}
`

class WalletFormatter implements IFormatter {
  format(data: any): string {
    const resp = Object.keys(data)
      .map(key => `${key}: ${data[key]}`)
      .join('\n')

    if (!resp) return 'Your wallet is empty'

    return tokenizer(template, { data: resp })
  }
}

export default WalletFormatter
