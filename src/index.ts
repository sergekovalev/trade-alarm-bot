require('dotenv').config()

import fetchQuotes from './workers/fetch-quotes';
import checkUsersStats from './workers/check-users-stats';
import DB from './core/DB';
import botApi from './core/bot/bot-api';

global.dirname = __dirname.split('/').slice(0, -1).join('/')

async function main() {
  await DB.instance().connect();
  
  console.log('Running API...');
  botApi();

  console.log('Running workers...');
  fetchQuotes();
  checkUsersStats();
}

main();