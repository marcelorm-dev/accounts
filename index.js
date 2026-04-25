const { Input, Select } = require("enquirer");
const chalk = require("chalk");
const Account = require("./src/account");
const OperationError = require("./src/operation-error");

const accounts = [];
var currentAccount = null;

function findAccount(accountName) {
  return accounts.find((account) => account.getName() === accountName);
}

function setCurrentAccount() {}

async function createAccount() {
  console.log(chalk.bgGreen("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir:"));

  buildAccount();
}

async function buildAccount() {
  const accountName = await new Input({
    name: "account",
    message: "Digite um nome para sua conta:",
  }).run();

  if (findAccount(accountName)) {
    console.log(chalk.red("Conta já existe! Escolha outro nome."));
  } else {
    let account = new Account(accountName);
    accounts.push(account);
    currentAccount = account;
    console.log(chalk.green(`Conta ${accountName} criada com sucesso!`));
  }

  askForAction();
}

async function checkBalance() {
  try {
    if (!currentAccount) {
      const accountName = await new Input({
        name: "balance",
        message: "Digite o nome da conta para consultar o saldo:",
      }).run();

      currentAccount = findAccount(accountName);
    }

    if (!currentAccount) {
      console.log(chalk.red("Conta não existe!"));
      buildAccount();
      return;
    }

    console.log(
      chalk.bgBlue(
        `O saldo da conta ${currentAccount.getName()} é: R$${currentAccount.getBalance()}`,
      ),
    );
  } catch (error) {
    console.error(error);
  }

  askForAction();
}

async function deposit() {
  try {
    if (!currentAccount) {
      const accountName = await new Input({
        name: "deposit",
        message: "Digite o nome da conta para depositar:",
      }).run();

      currentAccount = findAccount(accountName);
    }

    if (!currentAccount) {
      console.log(chalk.red("Conta não existe!"));
      buildAccount();
      return;
    }

    const amount = await new Input({
      name: "amount",
      message: "Digite o valor a ser depositado:",
    }).run();

    try {
      currentAccount.deposit(parseFloat(amount));
      console.log(
        chalk.green(
          `Depósito de R$${amount} realizado com sucesso na conta ${currentAccount.getName()}!`,
        ),
      );

      askForAction();
    } catch (error) {
      if (error instanceof OperationError) {
        console.log(chalk.red(error.message));
        deposit();
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function withdraw() {
  try {
    if (!currentAccount) {
      const accountName = await new Input({
        name: "withdraw",
        message: "Digite o nome da conta para sacar:",
      }).run();

      currentAccount = findAccount(accountName);
    }

    if (!currentAccount) {
      console.log(chalk.red("Conta não existe!"));
      buildAccount();
      return;
    }

    const amount = await new Input({
      name: "amount",
      message: "Digite o valor a ser sacado:",
    }).run();

    try {
      currentAccount.withdraw(parseFloat(amount));
      console.log(
        chalk.green(
          `Saque de R$${amount} realizado com sucesso na conta ${currentAccount.getName()}!`,
        ),
      );

      askForAction();
    } catch (error) {
      if (error instanceof OperationError) {
        console.log(chalk.red(error.message));
        withdraw();
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function exit() {
  console.log(chalk.bgBlue("Obrigado por usar o nosso banco!"));
}

async function askForAction() {
  try {
    const answer = await new Select({
      name: "actions",
      message: "O que você deseja fazer?",
      choices: ["Criar conta", "Consultar Saldo", "Depositar", "Sacar", "Sair"],
    }).run();

    switch (answer) {
      case "Criar conta":
        createAccount();
        break;
      case "Consultar Saldo":
        checkBalance();
        break;
      case "Depositar":
        deposit();
        break;
      case "Sacar":
        withdraw();
        break;
      case "Sair":
        exit();
        break;
    }
  } catch (error) {
    console.error(error);
  }
}

askForAction();
