const Account = require("../src/account");
const OperationError = require("../src/operation-error");

describe("Account", () => {
  test("Given initial balance, when creating an account, then it sets the balance", () => {
    const account = new Account("Test Account");
    expect(account.getName()).toBe("Test Account");
    expect(account.getBalance()).toBe(0);
  });
});

describe("Deposit", () => {
  test("Given an account with initial balance, when depositing money, then it updates the balance", () => {
    const account = new Account("Test Account");
    account.deposit(15);
    expect(account.getBalance()).toBe(15);
  });

  test("Given an account with initial balance, when depositing a non-numeric value, then it throws an error", () => {
    const account = new Account("Test Account");
    expect(account.getBalance()).toBe(0);

    const expectedMessage = "O valor do depósito deve ser um número.";

    expect(() => account.deposit("")).toThrow(OperationError);
    expect(() => account.deposit("")).toThrow(expectedMessage);
    expect(() => account.deposit("abc")).toThrow(OperationError);
    expect(() => account.deposit("abc")).toThrow(expectedMessage);
    expect(() => account.deposit("91a")).toThrow(OperationError);
    expect(() => account.deposit("91a")).toThrow(expectedMessage);
    expect(() => account.deposit(NaN)).toThrow(OperationError);
    expect(() => account.deposit(NaN)).toThrow(expectedMessage);

    expect(account.getBalance()).toBe(0);
  });

  test("Given an account with initial balance, when depositing a negative number, then it throws an error", () => {
    const account = new Account("Test Account");
    expect(account.getBalance()).toBe(0);

    expect(() => account.deposit(-1)).toThrow(OperationError);
    expect(() => account.deposit(-1)).toThrow(
      "O valor do depósito deve ser positivo.",
    );

    expect(account.getBalance()).toBe(0);
  });
});

describe("Withdraw", () => {
  test("Given an account with initial balance, when withdrawing money, then it updates the balance", () => {
    const account = new Account("Test Account");
    account.deposit(15);
    account.withdraw(5);
    expect(account.getBalance()).toBe(10);
  });

  test("Given an account with initial balance, when withdrawing a non-numeric value, then it throws an error", () => {
    const account = new Account("Test Account");
    account.deposit(15);

    const expectedMessage = "O valor do saque deve ser um número.";

    expect(() => account.withdraw("")).toThrow(OperationError);
    expect(() => account.withdraw("")).toThrow(expectedMessage);
    expect(() => account.withdraw("abc")).toThrow(OperationError);
    expect(() => account.withdraw("abc")).toThrow(expectedMessage);
    expect(() => account.withdraw("91a")).toThrow(OperationError);
    expect(() => account.withdraw("91a")).toThrow(expectedMessage);
    expect(() => account.withdraw(NaN)).toThrow(OperationError);
    expect(() => account.withdraw(NaN)).toThrow(expectedMessage);

    expect(account.getBalance()).toBe(15);
  });

  test("Given an account with initial balance, when withdrawing a negative number, then it throws an error", () => {
    const account = new Account("Test Account");
    account.deposit(15);

    expect(() => account.withdraw(-1)).toThrow(OperationError);
    expect(() => account.withdraw(-1)).toThrow(
      "O valor do saque deve ser positivo.",
    );

    expect(account.getBalance()).toBe(15);
  });

  test("Given an account with initial balance, when withdrawing more than the balance, then it throws an error", () => {
    const account = new Account("Test Account");
    account.deposit(15);

    expect(() => account.withdraw(20)).toThrow(OperationError);
    expect(() => account.withdraw(20)).toThrow(
      "Saldo insuficiente para realizar o saque.",
    );

    expect(account.getBalance()).toBe(15);
  });
});
