import IFormatter from './IFormatter'
import { tokenizer } from '../lib/helpers'

const template = `
Your Name is {{ name }}
You follow: {{ followings }}
`

class MeFormatter implements IFormatter {
  format(user: any): string {
    return tokenizer(template, {
      name: user.name,
      followings: user.actions.length
        ? '\n' + user.actions
            .map(
              (action: any) =>
                `${action.ticker} on ${action.comparator} ${action.price}`
            )
            .join('\n')
        : 'nothing',
    })
  }
}

export default MeFormatter
