import invoices from './invoices.json';

export type Invoice = typeof invoices[number];
export type Performance = Invoice['performances'][number];
export type Plays = {
  [key: string]: {
    name: string;
    type: string;
  };
};
export type Play = Plays[string];
