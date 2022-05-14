import DB from '../core/DB'
import { crypto } from '../api-providers/coinmarketcap'
import { Time } from 'hl-digits'

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

  setInterval(setLatestQuotes, Time.minutes(5))
}
