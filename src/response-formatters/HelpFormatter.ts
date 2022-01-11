import IFormatter from "./IFormatter";

export const help = `
Bot supports next commands:\n
/tickers - to get all supported tickers
/me - to get self info
/me <NAME> - to set your name
/wallet - to get wallet info
/clear wallet|actions - to clear up wallet|acions
/wallet <TICKER> - to get info about a ticker in your wallet. E.g. /wallet btc
/wallet <TICKER> <AMOUNT> - to add new ticker to your wallet. E.g. /wallet btc 100
/follow <TICKER> <PRICE> - to start following ticker's price
/price <TICKER> - to get price of ticker in USD
`

class HelpFormatter implements IFormatter{
  format(data: any = null): string {
    return help;
  }
}

export default HelpFormatter;