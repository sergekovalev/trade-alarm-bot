import CmdSwitcher from './cmd-switcher';
import {
  init as initCmd,
  help as helpCmd,
  tickers as tickersCmd,
  getMe as getMeCmd,
  setMe as setMeCmd,
  getWallet as getWalletInfoCmd,
  setWallet as setWalletCmd,
  followTicker as followTickerCmd,
  clearWallet as clearWalletCmd,
  clear as clearCmd,
  getPrice as getPriceCmd,
} from './cmds';

import DB from './core/DB';

export default async () => {
  const db = DB.instance();

  await db.initTickers();

  CmdSwitcher.onCmd(/\/start/, initCmd);
  CmdSwitcher.onCmd(/\/help/, helpCmd);
  CmdSwitcher.onCmd(/\/tickers/, tickersCmd);
  CmdSwitcher.onCmd(/^\/me$/, getMeCmd);
  CmdSwitcher.onCmd(/\/me (.+)/, setMeCmd);
  CmdSwitcher.onCmd(/^\/wallet$/, getWalletInfoCmd);
  // CmdSwitcher.onCmd(/^\/wallet clear$/, clearWalletCmd);
  CmdSwitcher.onCmd(/^\/wallet (.+)$/, setWalletCmd);
  CmdSwitcher.onCmd(/^\/follow (.+)$/, followTickerCmd);
  CmdSwitcher.onCmd(/^\/price (.+)$/, getPriceCmd);
  CmdSwitcher.onCmd(/^\/clear (.+)$/, clearCmd);
}