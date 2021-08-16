import {getStatementData, usd} from './utils';

import invoices from './invoices.json';
import plays from './plays.json';

import type {Invoice, Plays} from './type';
import type {StatementData} from './utils';

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

const statement = (invoice: Invoice, plays: Plays) => {
  return renderPlainText(getStatementData(invoice, plays));
};

console.info(statement(invoices[0], plays));
