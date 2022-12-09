const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/bankServer", 
{
    useNewUrlParser :true
}
)

const user = mongoose.model('users', {
    acno:Number,
    password:String,
    username:String,
    balance:0,
    transaction:[]
})

module.exports = {
    user
}