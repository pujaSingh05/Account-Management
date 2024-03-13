const express = require('express');
const {addAcount,  updateAccountDetails, getAllAccount,deleteAccount } = require('../controllers/accountController');


//router  objects
const router = express.Router();


//routes
//create || Post
router.post('/create', addAcount);


//register || post
router.post('/update', updateAccountDetails);

 
// || post  //coz passing id
router.post('/get',getAllAccount);


//post || post   
router.post('/delete', deleteAccount);  





module.exports = router;

