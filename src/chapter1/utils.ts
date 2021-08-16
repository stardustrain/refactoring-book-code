import type {Invoice, Plays} from './type';

type Performance = Invoice['performances'][number];

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
    let result = 0;
    const play = playFor(performance);

    switch (play.type) {
      case 'tragedy':
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30000;
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`Unknown play type: ${play.type}`);
    }

    return result;
  };

  const getVolumeCreditsFor = (performance: Performance) => {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);
    if (playFor(performance).type === 'comedy') {
      result += Math.floor(performance.audience / 5);
    }

    return result;
  };

  const getTotalVolumeCredits = (performances: Performance[]) =>
    performances.reduce(
      (acc, performance) => acc + getVolumeCreditsFor(performance),
      0
    );

  const getTotalAmount = (performances: Performance[]) =>
    performances.reduce((acc, performance) => acc + getAmount(performance), 0);

  return {
    customer: invoice.customer,
    performances: invoice.performances.map(performance => ({
      ...performance,
      play: playFor(performance),
      amount: getAmount(performance),
      volumeCredits: getVolumeCreditsFor(performance),
    })),
    totalAmount: getTotalAmount(invoice.performances),
    totalVolumeCredits: getTotalVolumeCredits(invoice.performances),
  };
};
