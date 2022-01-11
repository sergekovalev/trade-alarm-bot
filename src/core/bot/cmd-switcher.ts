import Bot from '../Bot';
const bot = Bot.instance();

const switcher = {
  onCmd: (cmd: RegExp, action: any) =>
    bot.onText(cmd, (msg: any, match: any) => action(msg, match)),
  onText: (action: any) =>
    bot.on('message', (msg: any, match: any) => action(msg, match))
}

export default switcher;