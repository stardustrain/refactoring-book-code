import getAmount from './getAmount';

import invoices from './invoices.json';
import plays from './plays.json';

import type {Invoice, Plays} from './type';

const statement = (invoice: Invoice, plays: Plays) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Result (Customer: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (const perf of invoice.performances) {
    const play = plays[perf.playId];
    const thisAmount = getAmount(perf, play);

    volumeCredits += Math.max(perf.audience - 30, 0);
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `total: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;

  return result;
};

console.info(statement(invoices[0], plays));
