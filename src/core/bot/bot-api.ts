import CmdSwitcher from './cmd-switcher';
import {
  init as initCmd,
  setMe as setMeCmd,
  help as helpCmd,
  tickers as tickersCmd,
  getMe as getMeCmd,
  callMe as callMeCmd,
  getWallet as getWalletInfoCmd,
  setWallet as setWalletCmd,
  followTicker as followTickerCmd,
  clearWallet as clearWalletCmd,
  clear as clearCmd,
  getPrice as getPriceCmd,
} from './cmds';

import Bot from '../Bot';
import DB from '../DB';

const bot = Bot.instance();

export default async () => {
  const db = DB.instance();

  await db.initTickers();

  CmdSwitcher.onCmd(/\/start/, initCmd);
  CmdSwitcher.onCmd(/^\/setme (.+)$/, setMeCmd);
  CmdSwitcher.onCmd(/\/help/, helpCmd);
  CmdSwitcher.onCmd(/\/tickers/, tickersCmd);
  CmdSwitcher.onCmd(/^\/me$/, getMeCmd);
  CmdSwitcher.onCmd(/\/callme (.+)/, callMeCmd);
  CmdSwitcher.onCmd(/^\/wallet$/, getWalletInfoCmd);
  // CmdSwitcher.onCmd(/^\/wallet clear$/, clearWalletCmd);
  CmdSwitcher.onCmd(/^\/wallet (.+)$/, setWalletCmd);
  CmdSwitcher.onCmd(/^\/follow (.+)$/, followTickerCmd);
  CmdSwitcher.onCmd(/^\/price (.+)$/, getPriceCmd);
  CmdSwitcher.onCmd(/^\/clear (.+)$/, clearCmd);
}