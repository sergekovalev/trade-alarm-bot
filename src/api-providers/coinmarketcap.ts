import Api from '../core/api'

const URL = 'https://pro-api.coinmarketcap.com/v1/'

export const crypto = {
  listings: {
    latest: () =>
      Api.get(`${URL}cryptocurrency/listings/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_TOKEN,
        },
      }),
  },
}
