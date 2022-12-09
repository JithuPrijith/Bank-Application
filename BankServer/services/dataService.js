
const jwt = require('jsonwebtoken')
const db = require('./db')

const register = (acno, username, password) => {
    return db.user.findOne({ acno })
        .then((user) => {
            if (user) {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'user already registered'
                }
            }
            else {
                const newUser = new db.user({
                    acno,
                    username,
                    password,
                    balance: 0,
                    transaction: []
                })
                newUser.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: 'succesfully registered'
                }
            }
        })
}

const login = (acno, pswd) => {
    return db.user.findOne({ acno, password: pswd })
        .then((user) => {
            console.log(user);
            if (user) {
                currentUser = user.username
                currentAcno = acno;
                const token = jwt.sign({ currentAcno: acno }, 'thisIsKey2021')
                return {
                    statusCode: 200,
                    status: true,
                    message: 'login success',
                    currentAcno,
                    currentUser,
                    token
                }
            }
            else {
                return {
                    statusCode: 401,
                    status: true,
                    message: 'incorrect password or username'
                }
            }
        })

}



const deposit = (acno, pswd, amount) => {
    return db.user.findOne({ acno, password: pswd })
        .then((user) => {
            if (user) {
                user.balance += parseInt(amount);
                user.transaction.push({
                    type: 'credit',
                    amount
                })
                user.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: `${amount} is credited balance is ${user.balance}`
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "no account"
                }
            }
        })
}

const withdraw = (acno, pswd, amt) => {
    var amount = parseInt(amt)
    return db.user.findOne({ acno, password: pswd })
        .then((user) => {
            if (user) {
                if (user.balance > amount) {
                    user.balance -= amount;
                    user.transaction.push({
                        type: 'debit',
                        amount
                    })
                    user.save()
                    return {
                        statusCode: 200,
                        status: true,
                        message: `${amount} is debited balance is ${user.balance}`
                    }
                }
                else {
                    return {
                        status: false,
                        statusCode: 401,
                        message: "insufficient balance"
                    }
                }
            }
            return {
                status: false,
                statusCode: 401,
                message: "no account"
            }
        })
}

const getTransaction = (acno) => {
    return db.user.findOne({ acno })
        .then((user) => {
            if (user) {
                return {
                    statusCode: 200,
                    status: true,
                    transaction: user.transaction
                }
            }
            else {
                return {
                    statusCode: 401,
                    status: true,
                    message: "no account found"
                }
            }
        })
}

const deleteAccount = (acno) => {
    return db.user.deleteOne({ acno })
        .then((user) => {
            if(user) {
                return {
                    statusCode: 200,
                    status: true,
                    message: 'account deleted'
                }
            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'account not found'
                }
            }
        })
}

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAccount
}
