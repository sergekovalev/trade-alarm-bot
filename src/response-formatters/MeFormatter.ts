import IFormatter from "./IFormatter";
import { tokenizer } from "../helpers";

const template = `
Name: {{ name }}
I follow:
{{ followings }}
`;

class MeFormatter implements IFormatter{
  format(user: any): string {
    return tokenizer(template, {
      name: user.name,
      followings: user.actions.map((action: any) => `${action.ticker} on ${action.price}`).join('\n')
    });
  }
}

export default MeFormatter;