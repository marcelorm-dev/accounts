const Account = require("../src/account");
const OperationError = require("../operation-error");
const { expectError } = require("./utils/expect_error");

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

    ["", "abc", "!)", "91a"].forEach((value) => {
      expectError(
        () => account.deposit(value),
        OperationError,
        "O valor do depósito deve ser um número.",
      );
    });

    expect(account.getBalance()).toBe(0);
  });

  test("Given an account with initial balance, when depositing a negative number, then it throws an error", () => {
    const account = new Account("Test Account");
    expect(account.getBalance()).toBe(0);

    expectError(
      () => account.deposit(-1),
      OperationError,
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

    ["", "abc", "!)", "91a"].forEach((value) => {
      const expectThrow = () => account.withdraw(value);
      expect(expectThrow).toThrow(OperationError);
      expect(expectThrow).toThrow("O valor do saque deve ser um número.");
    });

    expect(account.getBalance()).toBe(15);
  });

  test("Given an account with initial balance, when withdrawing a negative number, then it throws an error", () => {
    const account = new Account("Test Account");
    account.deposit(15);

    const expectThrow = () => account.withdraw(-1);
    expect(expectThrow).toThrow(OperationError);
    expect(expectThrow).toThrow("O valor do saque deve ser positivo.");

    expect(account.getBalance()).toBe(15);
  });

  test("Given an account with initial balance, when withdrawing more than the balance, then it throws an error", () => {
    const account = new Account("Test Account");
    account.deposit(15);

    const expectThrow = () => account.withdraw(20);
    expect(expectThrow).toThrow(OperationError);
    expect(expectThrow).toThrow("Saldo insuficiente para realizar o saque.");

    expect(account.getBalance()).toBe(15);
  });
});
