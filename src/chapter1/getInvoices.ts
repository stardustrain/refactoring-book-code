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

const renderHtml = (statementData: StatementData) => {
  const {customer, performances, totalAmount, totalVolumeCredits} =
    statementData;

  return `
  <h1>Result (Customer: ${customer})</h1>
  <table>
    <thead>
      <tr><th>연극</th><th>좌석수</th><th>금액</th></tr>
    </thead>
    <tbody>
      ${performances
        .map(
          performance => `
        <tr>
          <td>${performance.play.name}</td>
          <td>(${performance.audience}석)</td>
          <td>${usd(performance.amount)}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>
  <p>총액: <em>${usd(totalAmount)}</em></p>
  <p>적립 포인트: <em>${usd(totalVolumeCredits)}</em>점</p>
  `;
};

const statement = (invoice: Invoice, plays: Plays) => {
  return renderHtml(getStatementData(invoice, plays));
};

console.info(statement(invoices[0], plays));
