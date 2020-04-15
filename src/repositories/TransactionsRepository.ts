import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncomes = this.transactions.reduce(
      (acc: number, item: Transaction) => {
        if (item.type === 'income') {
          return acc + item.value;
        }
        return acc;
      },
      0,
    );

    const totalOutcomes = this.transactions.reduce(
      (acc: number, item: Transaction) => {
        if (item.type === 'outcome') {
          return acc + item.value;
        }
        return acc;
      },
      0,
    );

    const balance = {
      income: totalIncomes,
      outcome: totalOutcomes,
      total: totalIncomes - totalOutcomes,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
