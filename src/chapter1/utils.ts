import PerformanceCalculator from './PerformanceCalculator';

import type {Invoice, Plays, Performance} from './type';

export const usd = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);

export type StatementData = ReturnType<typeof getStatementData>;
export const getStatementData = (invoice: Invoice, plays: Plays) => {
  const playFor = (performance: Performance) => plays[performance.playId];

  const getAmount = (performance: Performance) => {
    return new PerformanceCalculator(performance, playFor(performance)).amount;
  };

  const getVolumeCreditsFor = (performance: Performance) => {
    return new PerformanceCalculator(performance, playFor(performance))
      .volumeCredits;
  };

  const getTotalVolumeCredits = (performances: Performance[]) =>
    performances.reduce(
      (acc, performance) => acc + getVolumeCreditsFor(performance),
      0
    );

  const getTotalAmount = (performances: Performance[]) =>
    performances.reduce((acc, performance) => acc + getAmount(performance), 0);

  const generatePerformances = (performance: Performance) => {
    const caculator = new PerformanceCalculator(
      performance,
      playFor(performance)
    );

    return {
      ...performance,
      play: playFor(performance),
      amount: caculator.amount,
      volumeCredits: caculator.volumeCredits,
    };
  };

  return {
    customer: invoice.customer,
    performances: invoice.performances.map(generatePerformances),
    totalAmount: getTotalAmount(invoice.performances),
    totalVolumeCredits: getTotalVolumeCredits(invoice.performances),
  };
};
