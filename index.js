const { Input, Select } = require("enquirer");
const chalk = require("chalk");
const Account = require("./src/account");
const OperationError = require("./operation-error");

const accounts = [];

function findAccount(accountName) {
  return accounts.find((account) => account.getName() === accountName);
}

function createAccount() {
  console.log(chalk.bgGreen("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir:"));

  let createAccountPrompt = new Input({
    name: "account",
    message: "Digite um nome para sua conta:",
  });

  createAccountPrompt
    .run()
    .then((accountName) => {
      if (findAccount(accountName)) {
        console.log(chalk.red("Conta já existe!"));
      } else {
        accounts.push(new Account(accountName));
        console.log(chalk.green(`Conta ${accountName} criada com sucesso!`));
      }

      askForAction();
    })
    .catch((error) => {
      console.error(error);
    });
}

function checkBalance() {
  let checkBalancePrompt = new Input({
    name: "balance",
    message: "Digite o nome da conta para consultar o saldo:",
  });

  checkBalancePrompt
    .run()
    .then((accountName) => {
      let account = findAccount(accountName);

      if (!account) {
        console.log(chalk.red("Conta não existe!"));
      } else {
        console.log(
          chalk.bgBlue(
            `O saldo da conta ${account.getName()} é: R$${account.getBalance()}`,
          ),
        );
      }

      askForAction();
    })
    .catch((error) => {
      console.error(error);
    });
}

function exit() {
  console.log(chalk.bgBlue("Obrigado por usar o nosso banco!"));
}

function deposit() {
  let depositPrompt = new Input({
    name: "deposit",
    message: "Digite o nome da conta para depositar:",
  });

  depositPrompt
    .run()
    .then((accountName) => {
      let account = findAccount(accountName);

      if (!account) {
        console.log(chalk.red("Conta não existe!"));
        askForAction();
      } else {
        let amountPrompt = new Input({
          name: "amount",
          message: "Digite o valor a ser depositado:",
        });

        amountPrompt
          .run()
          .then((amount) => {
            account.deposit(amount);

            console.log(
              chalk.green(
                `Depósito de R$${amount} realizado com sucesso na conta ${account.getName()}!`,
              ),
            );

            askForAction();
          })
          .catch((error) => {
            if (error instanceof OperationError) {
              console.log(chalk.red(error.message));
              askForAction();
            } else {
              console.error(error);
            }
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function withdraw() {
  let withdrawPrompt = new Input({
    name: "withdraw",
    message: "Digite o nome da conta para sacar:",
  });

  withdrawPrompt
    .run()
    .then((accountName) => {
      let account = findAccount(accountName);

      if (!account) {
        console.log(chalk.red("Conta não existe!"));
        askForAction();
      } else {
        let amountPrompt = new Input({
          name: "amount",
          message: "Digite o valor a ser sacado:",
        });

        amountPrompt
          .run()
          .then((amount) => {
            account.withdraw(amount);

            console.log(
              chalk.green(
                `Saque de R$${amount} realizado com sucesso na conta ${account.getName()}!`,
              ),
            );

            askForAction();
          })
          .catch((error) => {
            if (error instanceof OperationError) {
              console.log(chalk.red(error.message));
              askForAction();
            } else {
              console.error(error);
            }
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function askForAction() {
  let prompt = new Select({
    name: "actions",
    message: "O que você deseja fazer?",
    choices: ["Criar conta", "Consultar Saldo", "Depositar", "Sacar", "Sair"],
  });

  prompt
    .run()
    .then((answer) => {
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
    })
    .catch((error) => {
      console.error(error);
    });
}

askForAction();
