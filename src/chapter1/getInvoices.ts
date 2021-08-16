import {
  getAmount,
  playFor,
  getVolumeCreditsFor,
  getVolumeCredits,
  getTotalAmount,
  usd,
} from './utils';

import invoices from './invoices.json';

import type {Invoice} from './type';

const renderPlainText = (statementData: StatementData) => {
  const {customer, performances, totalAmount, totalVolumeCredits} =
    statementData;

  let result = `Result (Customer: ${customer})\n`;
  for (const perf of performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `total: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${totalVolumeCredits}점\n`;

  return result;
};

type StatementData = ReturnType<typeof getStatementData>;
const getStatementData = (invoice: Invoice) => ({
  customer: invoice.customer,
  performances: invoice.performances.map(performance => ({
    ...performance,
    play: playFor(performance),
    amount: getAmount(performance),
    volumeCredits: getVolumeCreditsFor(performance),
  })),
  totalAmount: getTotalAmount(invoice.performances),
  totalVolumeCredits: getVolumeCredits(invoice.performances),
});

const statement = (invoice: Invoice) => {
  const statementData = getStatementData(invoice);
  return renderPlainText(statementData);
};

console.info(statement(invoices[0]));
