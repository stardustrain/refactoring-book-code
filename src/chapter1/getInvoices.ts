import {
  getAmount,
  playFor,
  getVolumeCredits,
  getTotalAmount,
  usd,
} from './utils';

import invoices from './invoices.json';

import type {Invoice} from './type';

const statement = (invoice: Invoice) => {
  let result = `Result (Customer: ${invoice.customer})\n`;

  for (const perf of invoice.performances) {
    result += `${playFor(perf).name}: ${usd(getAmount(perf))} (${
      perf.audience
    }석)\n`;
  }

  result += `total: ${usd(getTotalAmount(invoice.performances))}\n`;
  result += `적립 포인트: ${getVolumeCredits(invoice.performances)}점\n`;

  return result;
};

console.info(statement(invoices[0]));
