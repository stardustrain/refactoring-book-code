import {
  getAmount,
  playFor,
  getVolumeCredits,
  getTotalAmount,
  usd,
} from './utils';

import invoices from './invoices.json';

import type {Invoice} from './type';

type StatementData = {
  customer: Invoice['customer'];
  performances: Invoice['performances'];
};
const renderPlainText = (statementData: StatementData) => {
  const {customer, performances} = statementData;

  let result = `Result (Customer: ${customer})\n`;
  for (const perf of performances) {
    result += `${playFor(perf).name}: ${usd(getAmount(perf))} (${
      perf.audience
    }석)\n`;
  }

  result += `total: ${usd(getTotalAmount(performances))}\n`;
  result += `적립 포인트: ${getVolumeCredits(performances)}점\n`;

  return result;
};

const statement = (invoice: Invoice) => {
  const statementData = {
    customer: invoice.customer,
    performances: {...invoice.performances},
  };
  return renderPlainText(statementData);
};

console.info(statement(invoices[0]));
