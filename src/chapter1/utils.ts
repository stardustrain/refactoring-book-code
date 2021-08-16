import {
  TragedyPerformanceCalculator,
  ComedyPerformanceCalculator,
} from './PerformanceCalculator';

import type {Invoice, Plays, Performance} from './type';
import type {PerformanceCalculatorParameters} from './PerformanceCalculator';

export const usd = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);

const createPerformanceCalculator = (
  ...args: PerformanceCalculatorParameters
) => {
  const [, play] = args;
  switch (play.type) {
    case 'tragedy':
      return new TragedyPerformanceCalculator(...args);
    case 'comedy':
      return new ComedyPerformanceCalculator(...args);
    default:
      throw new Error(`Unknown play type: ${play.type}`);
  }
};

export type StatementData = ReturnType<typeof getStatementData>;
export const getStatementData = (invoice: Invoice, plays: Plays) => {
  const playFor = (performance: Performance) => plays[performance.playId];

  type GeneratePerformances = ReturnType<typeof generatePerformances>;
  const generatePerformances = (performance: Performance) => {
    const caculator = createPerformanceCalculator(
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

  const getTotalVolumeCredits = (performances: GeneratePerformances[]) =>
    performances.reduce(
      (acc, performance) => acc + performance.volumeCredits,
      0
    );

  const getTotalAmount = (performances: GeneratePerformances[]) =>
    performances.reduce((acc, performance) => acc + performance.amount, 0);

  const performances = invoice.performances.map(generatePerformances);

  return {
    customer: invoice.customer,
    performances,
    totalAmount: getTotalAmount(performances),
    totalVolumeCredits: getTotalVolumeCredits(performances),
  };
};
