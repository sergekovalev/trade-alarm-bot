import DB from '../DB';
import Bot from '../Bot';
import MeFormatter from '../../response-formatters/MeFormatter';
import HelpFormatter from '../../response-formatters/HelpFormatter';
import InitFormatter from '../../response-formatters/InitFormatter';
import GetTickersFormatter from '../../response-formatters/GetTickersFormatter';
import WalletFormatter from '../../response-formatters/WalletFormatter';
import Media from '../../lib/Media';
import logger from '../logger';
import { switchComparator } from '../../lib/helpers';

const bot = Bot.instance();
const db = DB.instance();

export const init = (msg: any, match: any) => {
  const {
    is_bot: isBot,
    language_code: languageCode
  } = msg.from;
  
  const {
    id: chatId,
    first_name: firstName,
    last_name: lastName,
    username
  } = msg.chat;

  if(isBot) {
    return bot.sendMessage(chatId, 'Sorry, I prefer talking to real people.');
  }

  db.initUser({
    chatId,
    name: `${firstName} ${lastName}`,
    username
  });

  bot.sendPhoto(chatId, new Media().images.init);
  bot.sendMessage(chatId, new InitFormatter().format());
  
  logger(`Initialized user ${firstName} ${lastName}`);
}

export const help = (msg: any, match: any) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, new HelpFormatter().format());
}

export const tickers = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const tickers = await db.getTickers();

  bot.sendMessage(chatId, new GetTickersFormatter().format(tickers));
}

export const getMe = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const user = await db.getUser(chatId);

  bot.sendMessage(chatId, new MeFormatter().format(user));
}

export const setMe = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const user = await db.getUser(chatId);

  bot.sendMessage(chatId, `👍`);
}

export const callMe = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const user = await db.getUser(chatId);

  const name = match[1]

  user.name = name;

  await db.setUser(user);

  bot.sendMessage(chatId, `OK, ${name} 👍`);
}

export const clearWallet = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const user = await db.getUser(chatId);

  user.wallet = {};

  await db.setUser(user);

  bot.sendMessage(chatId, 'Your wallet successfully cleared up');
}

export const getWallet = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const user = await db.getUser(chatId);

  bot.sendMessage(chatId, new WalletFormatter().format(user.wallet));
}

export const setWallet = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const user = await db.getUser(chatId);

  const [ticker, amount] = match[1].toLowerCase().split(' ');

  if(ticker === 'clear') return;

  const tickers = (await db.getTickers()).map((ticker: string) => ticker.toLowerCase());

  if(!tickers.includes(ticker)) {
    return bot.sendMessage(chatId, `Unsupported ticker «${ticker.toUpperCase()}»`);
  }

  if(amount !== undefined) {
    if(['+', '-'].includes(amount[0])) {
      user.wallet[ticker] = parseFloat(user.wallet[ticker]) + parseFloat(amount);
    } else {
      user.wallet[ticker] = parseFloat(amount);
    }
  
    await db.setUser(user);
  
    bot.sendMessage(chatId, `Now your wallet is:\n${ticker}: ${user.wallet[ticker]}`);
  } else {
    bot.sendMessage(chatId, `Value for ${ticker} is ${user.wallet[ticker]}`);
  }
}

export const followTicker = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const user = await db.getUser(chatId);

  const [ticker, price] = match[1].toLowerCase().split(' ');

  console.log(ticker, price)

  const hasOperation = /[0-9]/.test(price[0])

  const comparator = hasOperation ? 'eq' : switchComparator(price);

  user.actions.push({
    ticker,
    price: parseFloat(hasOperation ? price : price.slice(1)),
    on: comparator
  });

  db.setUser(user);

  bot.sendMessage(chatId, `Now you follow ${ticker} on ${price} price`);
}

export const getPrice = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const ticker = match[1].toUpperCase();

  try {
    const price = await db.getPriceFor(ticker);

    bot.sendMessage(chatId, `${ticker} costs $${price}`);
  } catch (e) {
    bot.sendMessage(chatId, `Error while getting price for ${ticker.toFixed(2)}`)
  }
}

export const clear = async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  const target = match[1];

  const user = await db.getUser(chatId);

  switch(target) {
    case 'wallet':
      user.wallet = {};
      break;
    case 'actions':
      user.actions = [];
      break;
    default:
      return bot.sendMessage(chatId, `Don't know how to clear ${target}`);
  }

  db.setUser(user);

  bot.sendMessage(chatId, `${target} cleared`);
}
