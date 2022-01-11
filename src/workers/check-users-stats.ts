import { time } from '../helpers';
import DB from '../core/DB';
import Bot from '../core/Bot';

const bot = Bot.instance();

const checkStatus = (price: number, action: any) => {
  switch(action.on) {
    case 'eq':
      return price === action.price;
    case 'gt':
      return price > action.price;
    case 'gte':
      return price >= action.price;
    case 'lt':
      return price < action.price;
    case 'lte':
      return price <= action.price;
    default:
      return false;
  }
}

async function fetchStats() {
  const quotes = await DB.instance().getQuotes();
    const users = await DB.instance().getUsers();

    users.forEach((user: any) => {
      user.actions.forEach((action: any, i: number) => {
        const price = quotes.find(({ symbol }: any) => symbol === action.ticker)?.price;

        if(checkStatus(price, action) && (Date.now() - action.lastChecked) > time.hours(1)) {
          bot.sendMessage(user.chatId, `${action.ticker.toUpperCase()} is $${price.toFixed(2)}`);

          user.actions[i].lastChecked = Date.now();

          DB.instance().setUser(user);
        }
      })
    });
}

export default () => {
  fetchStats();

  setInterval(fetchStats, time.minutes(10));
}