const dataService = require('./services/dataService')
const jwt = require('jsonwebtoken')
const cors = require('cors')

// create server
//  1. import express
const express = require("express")

// create an app using express
const app = express()

app.use(cors({
    origin :['http://localhost:4200','http://192.168.1.183:8080']
}))

app.use(express.json())


// create a port number
app.listen(3000, () => {
    console.log("listening to port 3000");

})
// const middleware = (req, res, next) => {
//     next()
// }
// app.use(middleware)


// verify the login using jwt token
const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['token'];
        const data = jwt.verify(token, 'thisIsKey2021')
        next();
    } catch (error) {
        res.status(401).json({
            statusCode: 422,
            status: false,
            message: "please login"
        })
    }
}

// http resolve
app.get('/', (req, res) => {
    res.send("get method")
})

// registering the user
app.post('/register', (req, res) => {
    dataService.register(req.body.acno, req.body.username, req.body.password)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

// login user
app.post('/login', (req, res) => {
    dataService.login(req.body.acno, req.body.pswd).then((result) => {
        res.status(result.statusCode).json(result)
    })
})

// deposit amount
app.post('/deposit', jwtMiddleware, (req, res) => {
    dataService.deposit(req.body.acno, req.body.password, req.body.amount).then((result) => {
        res.status(result.statusCode).json(result)
    })
})

// withdraw amount
app.post('/withdraw', jwtMiddleware, (req, res) => {
    dataService.withdraw(req.body.acno, req.body.password, req.body.amount).then((result) => {
        res.status(result.statusCode).json(result)
    })
})

// view transaction
app.post('/transaction',jwtMiddleware, (req, res) => {
    dataService.getTransaction(req.body.acno).then((result) => {
        res.status(result.statusCode).json(result)
    })

})


app.delete('/deleteAccount/:acno',(req,res) => {
    dataService.deleteAccount(req.params.acno).then((result) => {
        res.status(result.statusCode).json(result)
    })
})

