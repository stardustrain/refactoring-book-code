import type {Invoice, Plays} from './type';

type Performancs = Invoice['performances'][number];
type Play = Plays[string];

const getAmount = (perf: Performancs, play: Play) => {
  let thisAmount = 0;

  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`Unknown play type: ${play.type}`);
  }

  return thisAmount;
};

export default getAmount;
