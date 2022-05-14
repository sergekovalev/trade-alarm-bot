import DB from '../core/DB'
import { time } from '../lib/helpers'
import { crypto } from '../api-providers/coinmarketcap'

async function setLatestQuotes() {
  try {
    const resp = await crypto.listings.latest()

    DB.instance().setLatestQuotes(resp.data.data)

    console.log('Fetched latest quotes.')
  } catch (err) {
    console.error('Error while fetching latest quotes', err)
  }
}

export default () => {
  setLatestQuotes()

  setInterval(setLatestQuotes, time.minutes(5))
}
