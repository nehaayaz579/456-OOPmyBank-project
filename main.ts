import inquirer from "inquirer";
//Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance:number;
    withdraw (amount:number) : void;
    deposite (amount:number) :void;
    checkBalance():void;
}
//Bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber : number , balance : number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
//debit money
withdraw (amount : number) : void {
    if (this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdraw of ${amount} successful.Remaining balance:$${this.balance}`)//////////////////
    }else{
        console.log("Insufficient balance")
    }
} 
//credit money
deposite(amount:number) : void {
    if (amount > 100){
        amount -= 1;//$1 fee charged if more than $100 is deposited
    }this.balance += amount;
    console.log(`Deposite of $${amount} successful.Remaining balance:$${this.balance}`)//////////////////
}
//check balance
checkBalance(): void {
    console.log(`Current balance : $${this.balance}`)
}
}
//customer class
class Customer {
    firstName : string;
    lastName : string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;

    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;

    }
}
//create bank account
const accounts: BankAccount[] = [
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,2000)
];
//create customer
const customers : Customer[] = [
    new Customer ("Hassan","Raza","Male",35,3162223334,accounts[0]),
    new Customer ("Abdullah","Shaikh","Male",24,3332223334,accounts[1]),
    new Customer ("Neha","Ayaz","Female",35,3412223334,accounts[2])
    ]
 //function to interact with bank account
 async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
           name:"accountNumber",
           type:"number",
           message:"Enter your account number:" 
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
    if (customer){
        console.log(`Welcome,${customer.firstName} ${customer.lastName}`)
        const ans = await inquirer.prompt([{
            name:"select",
            type:"list",
            message:"Select an operation",
            choices :["Deposite","Withdraw","Check Balance","Exit"]
        }])
        switch (ans.select) {
            case "Deposite":
                const depositeAmount = await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to deposite:"
                })
                customer.account.deposite(depositeAmount.amount)
                break;
                case "Withdraw":
                const withdrawAmount = await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to withdraw:"
                })
                customer.account.withdraw(withdrawAmount.amount)
                break;
                case "Check Balance":
                customer.account.checkBalance()
                break;
                case "Exit":
                console.log("Exiting bank program........")
                console.log("\n Thank You for using our bank services.Have a great day!!")
                return;    

        }
    }else{
        console.log("Invalid account number.Please try again.")
    }
    }while(true)
 } 
 service()  
    