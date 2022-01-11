import IFormatter from "./IFormatter";

export const help = `
Hello! Nice to have you with us!
Type or click /help command to get all the info.
`

class InitFormatter implements IFormatter{
  format(data: any = null): string {
    return help;
  }
}

export default InitFormatter;