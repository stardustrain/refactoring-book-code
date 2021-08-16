import invoices from './invoices.json';

export type Invoice = typeof invoices[number];
export type Plays = {
  [key: string]: {
    name: string;
    type: string;
  };
};
