import {getAmount, playFor, getVolumeCreditsFor} from './utils';

import invoices from './invoices.json';

import type {Invoice} from './type';

const statement = (invoice: Invoice) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Result (Customer: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (const perf of invoice.performances) {
    volumeCredits += getVolumeCreditsFor(perf);

    result += `${playFor(perf).name}: ${format(getAmount(perf) / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += getAmount(perf);
  }

  result += `total: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;

  return result;
};

console.info(statement(invoices[0]));
