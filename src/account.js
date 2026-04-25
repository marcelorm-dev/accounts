const OperationError = require("./operation-error");

class Account {
  constructor(name) {
    this.name = name;
    this.balance = 0;
  }

  getName() {
    return this.name;
  }

  getBalance() {
    return this.balance;
  }

  deposit(amount) {
    if (typeof amount !== "number" || !Number.isFinite(amount)) {
      throw new OperationError("O valor do depósito deve ser um número.");
    }

    if (amount <= 0) {
      throw new OperationError("O valor do depósito deve ser positivo.");
    }

    this.balance += parseFloat(amount);
  }

  withdraw(amount) {
    if (typeof amount !== "number" || !Number.isFinite(amount)) {
      throw new OperationError("O valor do saque deve ser um número.");
    }

    if (amount <= 0) {
      throw new OperationError("O valor do saque deve ser positivo.");
    }

    if (amount > this.balance) {
      throw new OperationError("Saldo insuficiente para realizar o saque.");
    }

    this.balance -= parseFloat(amount);
  }
}

module.exports = Account;
