import DB from '../core/DB';
import { time } from '../helpers';

function setLatestQuotes() {
  DB.instance().setLatestQuotes();
}

export default () => {
  setLatestQuotes();

  setInterval(setLatestQuotes, time.minutes(5))
}