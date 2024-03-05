const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
    },
    category:{
        type:String,
        required:true
    },
    date: {
        type : String,
        default : Date.now()
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    }
},{timestamps: true});

module.exports = mongoose.model('Expense',expenseSchema);