import plays from './plays.json';
import type {Invoice, Plays} from './type';

type Performance = Invoice['performances'][number];

export const playFor = (performance: Performance) =>
  (plays as Plays)[performance.playId];

export const getVolumeCreditsFor = (performance: Performance) => {
  let volumeCredits = 0;
  volumeCredits += Math.max(performance.audience - 30, 0);
  if (playFor(performance).type === 'comedy') {
    volumeCredits += Math.floor(performance.audience / 5);
  }

  return volumeCredits;
};

export const getAmount = (performance: Performance) => {
  let result = 0;
  const play = playFor(performance);

  switch (play.type) {
    case 'tragedy':
      result = 40000;
      if (performance.audience > 30) {
        result += 1000 * (performance.audience - 30);
      }
      break;
    case 'comedy':
      result = 30000;
      if (performance.audience > 20) {
        result += 10000 + 500 * (performance.audience - 20);
      }
      result += 300 * performance.audience;
      break;
    default:
      throw new Error(`Unknown play type: ${play.type}`);
  }

  return result;
};
