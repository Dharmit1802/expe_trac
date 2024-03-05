const express = require("express");


const router = express.Router();

const { login, signup } = require("../controller/Auth");
const {addExpense} = require('../controller/AddExpense');
const {auth} = require('../middlewares/auth');
const {getExpense} = require('../controller/getExpense')

router.post("/login",login);
router.post("/signup", signup);
router.get('/dashboard', auth, (req, res) => {
    try {
      // Access user data from the request object
      const user = req.user;
      console.log(user);
  
      // Send user data or perform other operations
      res.status(200).json({
        success:true,
        user,
        message:'user logged in successfully'
    })
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
router.post("/addexpense", addExpense);

router.get('/getexpense', getExpense);




module.exports = router;
