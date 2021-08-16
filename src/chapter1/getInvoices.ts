import {getAmount, playFor, getVolumeCreditsFor, usd} from './utils';

import invoices from './invoices.json';

import type {Invoice} from './type';

const statement = (invoice: Invoice) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Result (Customer: ${invoice.customer})\n`;

  for (const perf of invoice.performances) {
    volumeCredits += getVolumeCreditsFor(perf);

    result += `${playFor(perf).name}: ${usd(getAmount(perf))} (${
      perf.audience
    }석)\n`;
    totalAmount += getAmount(perf);
  }

  result += `total: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;

  return result;
};

console.info(statement(invoices[0]));
