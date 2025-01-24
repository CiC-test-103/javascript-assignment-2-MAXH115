// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }
    // Add methods here:
    // Example: createAccount(name, initialDeposit)

    createAccount(name, initialDeposit) {
        if (initialDeposit < 0) {
            console.log("Initial deposit must be positive.");
            return;
        }

        const account = new Account(name, initialDeposit);
        this.accounts.push(account);
        console.log(`Account created for ${name} with initial deposit of $${initialDeposit}.`);
        return account;
    }
    displayAccounts() {
        if (this.accounts.length === 0) {
            console.log("No accounts available.");
            return;
        }

        console.log("List of accounts in the bank:");
        this.accounts.forEach((account, index) => {
            console.log(`${index + 1}. Name: ${account.name}, Balance: $${account.balance}`);
        });
    }

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:

    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }

    deposit(amount) {
        if (amount < 0) {
            console.log(`Deposit amount must be positive.`)
            return;
        }
        this.balance += amount;
        this.transactionHistory.push({ transactionType: 'Deposit', amount });
        console.log(`Deposit ${amount} in ${this.name}'s account, new balance is $${this.balance}.`);
    }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }

    withdraw(amount) {
        if (amount < 0) {
            console.log(`Withdraw amount must be positive.`)
            return
        }
        if (this.balance < amount) {
            console.log(`Your balance is not enough, please choose amount less than $${this.balance}.`)
            return
        }
        this.balance -= amount;
        this.transactionHistory.push({ transactionType: 'Withdrawal', amount });
        console.log(`Withdrawl ${amount} in ${this.name}'s account, new balance is $${this.balance}.`);
    }

    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }

    transfer(amount, recipientAccount) {
        if (amount < 0) {
            console.log(`Transfer amount must be positive.`)
        }
        if (this.balance < amount) {
            console.log(`Your balance is not enough, please choose amount less than $${this.balance}.`)
        }

        if (!recipientAccount || !(recipientAccount instanceof Account)) {
            console.log("Invalid recipient account. Please provide a valid account.");
            return;
        }

        this.balance -= amount;
        recipientAccount.balance += amount;

        this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name });
        recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name })
        console.log(`Transfer ${amount} to ${recipientAccount.name}'s account, new balance is $${this.balance}.`);

    }

    // Example: checkBalance()
    checkBalance() {
        console.log(`${this.name}'s balance is $${this.balance}.`);
        return this.balance;
    }




}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // bank.displayAccounts();

    // Return balances for testing
    return {
        johnFinalBalance,
        janeFinalBalance,
        johnTransactionHistory: johnAccount.transactionHistory,
        janeTransactionHistory: janeAccount.transactionHistory
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());

