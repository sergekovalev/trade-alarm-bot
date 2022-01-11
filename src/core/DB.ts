import { MongoClient } from 'mongodb';
import IFormatter from 'src/response-formatters/IFormatter';
import { crypto } from '../api-providers/coinmarketcap';

class DB {
  static _shared : DB;
  connection: any
  collections: any = {};

  static instance() {
    if(!DB._shared) {
      DB._shared = new DB();
    }

    return this._shared;
  }

  async connect() {
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url);

    this.connection = await client.connect()
      
    const db = client.db('tradebot');
    
    this.collections.tickers = db.collection('tickers');
    this.collections.quotes = db.collection('quotes');
    this.collections.users = db.collection('users');

    console.log('>>>', 'Connected Database.')
  }

  async initUser(chatId: string) {
    const count = await this.collections.users.find({ chatId }).count();

    if(!count) {
      await this.collections.users.insertMany([{
        chatId,
        name: 'Guest',
        currency: 'usd',
        wallet: {},
        actions: []
      }]);
  
      console.log('>>>', 'Initialized User');
    }
  }

  async initTickers() {
    const resp = await crypto.listings.latest();

    const count = (await this.collections.tickers.stats()).count;
    
    if(!count) {
      await this.collections.tickers.insertMany(
        resp.data.data.map(({ name, symbol }: any) => ({
          name,
          symbol,
        }))
      );
      
      console.log('>>>', 'Initialized Tickers');
    }
  }

  async getTickers() {
    const tickers = await this.collections.tickers.find({}).toArray();

    return tickers.map(({ symbol }: { symbol: string }) => symbol)
  }

  async getUser(chatId: string) {
    const user = await this.collections.users.findOne({ chatId });

    return user;
  }
  
  getUsers() {
    return this.collections.users.find({}).toArray();
  }

  setUser(user: any) {
    return this.collections.users.updateOne(
      { _id: user._id },
      { $set: user }
    )
  }

  async setLatestQuotes(data: Array<any>) {
    await this.collections.quotes.drop(() => {});
    await this.collections.quotes.insertMany(data);
  }

  async getPriceFor(symbol: string): Promise<number> {
    const price = await this.collections.quotes.findOne({ symbol });

    return price.quote.USD.price;
  }

  async getQuotes(): Promise<Array<any>> {
    const quotes = await this.collections.quotes.find({}).toArray();

    const mapper = ({ symbol, quote: { USD: { price } } } : any) =>
      ({ symbol: symbol.toLowerCase(), price });

    return quotes.map(mapper);
  }
}

export default DB;
