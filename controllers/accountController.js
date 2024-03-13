const accountModel = require("../models/account.js");
// const moment = require("moment");
 const addAcount = async (req, res) => {
    try{
        const newAccount = new accountModel(req.body);
        await newAccount.save();
        res.status(201).send({success:true , message:'New Account  Stored'});

    }catch(error){
        console.log(error)
        res.status(500).send({success:false , message: `${error.message}`})
};
};

// get all account
 const getAllAccount = async (req, res) => {
  try {

        const account = await  accountModel.find({userid: req.body.userid});
        return res.status(200).json({
            success: true,
            account,
          });
        }
        catch (error) {
  console.log(error);
  res.status(500).json(error);
}
};
        
    
// // get Account
//  const getAccount = async (req, res) => {
//     try{
//         const account = await  Account.findOne({name : req.body.name});
//         if(account){
//             return res.status(200).json({
//                 success: true,
//                 message: "Account  Exist",
//               });
//         }
//     }
//         catch (error) {
//             console.log(error);
//             res.status(500).send({
//               success: false,
//               error,
//               message: "Error in Fetching Doctor Details",
//             });
//           }
//         };


//update 

 const updateAccountDetails = async (req, res) => {
    try {
    await accountModel.findOneAndUpdate(
        { _id: req.body._id },
        req.body.payload
      );
      res.status(200).send({
        success: true,
        message: "Account Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Update issue",
        error,
      });
    }
  };


  //delete 
   const deleteAccount = async (req, res) => {
    try{
        const account = await  accountModel.findOne({name : req.body.name});

        if(account){
            await account.deleteOne();
            return res.status(200).json({
                success: true,
                message: "Account Deleted Successfull",
              });
        }
    }catch(error){
        console.log(error)
        res.status(500).send({success:false , message: `${error.message}`})
};
};


module.exports = {
  addAcount,
  updateAccountDetails,
  deleteAccount,
    getAllAccount  };