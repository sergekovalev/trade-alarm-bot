import IFormatter from "./IFormatter";

export const help = `
Hello! Nice to have you with us!
Type or click /help command to get all the info.
Or type or click /setme command to set you account step by step.
`

class InitFormatter implements IFormatter{
  format(data: any = null): string {
    return help;
  }
}

export default InitFormatter;