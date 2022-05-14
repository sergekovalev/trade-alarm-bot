import mongoose from "mongoose";
import { UserEntity } from "../entities/User.entity";
import { crypto } from '../api-providers/coinmarketcap'
import { Currency } from "../types/currency.enum";
import { TickerEntity } from "../entities/Ticker.entity";
import { QuoteEntity } from "../entities/Quote.entity";

type InitUser = {
  chatId: number
  name: string
  username: string
}

class DB {
  static _shared: DB
  connection: any

  static instance() {
    if (!DB._shared) {
      DB._shared = new DB()
    }

    return this._shared
  }

  async connect() {
    const url = 'mongodb://127.0.0.1:27017'
    const client = await mongoose.connect(url);

    console.log('>>>', 'Connected Database.')
  }

  async initUser({ chatId, name, username }: InitUser) {
    const count = await UserEntity.find({ chatId }).count()

    if (!count) {
      await UserEntity.insertMany([
        {
          chatId,
          name,
          username,
          currency: Currency.USD,
          wallet: {},
          actions: [],
        },
      ])

      console.log('>>>', 'Initialized User')
    }
  }

  async initTickers() {
    const resp = await crypto.listings.latest()

    const count = await TickerEntity.count();

    if (!count) {
      await TickerEntity.insertMany(
        resp.data.data.map(({ name, symbol }: any) => ({
          name,
          symbol,
        }))
      )

      console.log('>>>', 'Initialized Tickers')
    }
  }

  async getTickers() {
    const tickers = await TickerEntity.find()

    return tickers.map(({ symbol }: { symbol: string }) => symbol)
  }

  async getUser(chatId: string) {
    const user = await UserEntity.findOne({ chatId })

    return user
  }

  getUsers() {
    return UserEntity.find()
  }

  setUser(user: any) {
    return UserEntity.updateOne({ _id: user._id }, { $set: user })
  }

  async setLatestQuotes(data: Array<any>) {
    await QuoteEntity.deleteMany();
    await QuoteEntity.insertMany(data);
  }

  async getPriceFor(symbol: string): Promise<number> {
    const price = await QuoteEntity.findOne({ symbol })

    return price.quote.USD.price
  }

  async getQuotes(): Promise<Array<any>> {
    const quotes = await QuoteEntity.find()

    const mapper = ({
      symbol,
      quote: {
        USD: { price },
      },
    }: any) => ({ symbol: symbol.toLowerCase(), price })

    return quotes.map(mapper)
  }
}

export default DB
