import IFormatter from "./IFormatter";
import { tokenizer } from "../lib/helpers";

const template = `
My Name is {{ name }}
I follow:
{{ followings }}
`;

class MeFormatter implements IFormatter{
  format(user: any): string {
    return tokenizer(template, {
      name: user.name,
      followings: user.actions.length ? user.actions.map((action: any) => `${action.ticker} on ${action.price}`).join('\n') : 'nothing'
    });
  }
}

export default MeFormatter;