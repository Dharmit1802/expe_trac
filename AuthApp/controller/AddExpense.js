const Expense = require('../model/Expenses');
const User = require('../model/User');

exports.addExpense = async (req,res) =>{

    try{
        const {title,amount,category,date,user} = req.body;

        const expenseObj = new Expense({
            title,amount,category,date,user
        })
    
        const expense = await expenseObj.save();
    
        const updateUser = await User.findByIdAndUpdate(user,{$push :{expenses: expense._id}},{new:true}).populate("expenses");
    
        res.json({
            user : updateUser
        })
    }catch(error){
        return res.json({
            success:false,
            message:error.message
        })
    }
    
}

