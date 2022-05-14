require('dotenv').config()

import fetchQuotes from './workers/fetch-quotes'
import checkUsersStats from './workers/check-users-stats'
import DB from './core/DB'
import botApi from './core/bot/bot-api'
import fs from 'fs'
import logger from './core/logger'

global.dirname = __dirname.split('/').slice(0, -1).join('/')
global.logger = logger

if (!fs.existsSync(`${dirname}/.log`)) {
  fs.writeFileSync(`${dirname}/.log`, '')
}

async function main() {
  await DB.instance().connect()

  console.log('Running API...')
  botApi()

  console.log('Running workers...')
  fetchQuotes()
  checkUsersStats()
}

main()
