import plays from './plays.json';
import type {Invoice, Plays} from './type';

type Performance = Invoice['performances'][number];

export const usd = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);

export const playFor = (performance: Performance) =>
  (plays as Plays)[performance.playId];

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

export const getVolumeCreditsFor = (performance: Performance) => {
  let result = 0;
  result += Math.max(performance.audience - 30, 0);
  if (playFor(performance).type === 'comedy') {
    result += Math.floor(performance.audience / 5);
  }

  return result;
};

export const getVolumeCredits = (performances: Performance[]) => {
  let result = 0;
  for (const perf of performances) {
    result += getVolumeCreditsFor(perf);
  }

  return result;
};

export const getTotalAmount = (performances: Performance[]) => {
  let result = 0;
  for (const perf of performances) {
    result += getAmount(perf);
  }

  return result;
};
