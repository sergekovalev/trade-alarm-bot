import TelegramBot from 'node-telegram-bot-api'

class Bot {
  static _shared: Bot
  bot: TelegramBot

  static instance() {
    if (!Bot._shared) {
      Bot._shared = new Bot()
    }

    return this._shared.bot
  }

  constructor() {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })
  }
}

export default Bot
