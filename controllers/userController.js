const userModel = require("../models/userModels");
const bcrypt = require('bcryptjs');

// login callback
const LoginController = async (req, res)=> {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch){
      return res.status(200).send({message: 'Invalid Email or Password', success : false});
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const RegisterController = async (req, res) =>{
  try{
     const existingUser = await userModel.findOne({email : req.body.email});
     if(existingUser){
      return res.status(200).send({message:'User Already Exist', success:false});
     }

     const password = req.body.password;
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);
     req.body.password = hashedPassword;

     const newUser = new userModel(req.body);
     await newUser.save();
     res.status(201).send({success:true , message:'User Register Successfully'});

  }catch(error){
      console.log(error)
      res.status(500).send({success:false , message: `Register Controller ${error.message}`})
  }

}

// const authController = async (req, res) => {
//   try {
//     const user = await userModel.findById({ _id: req.body.userId });
//     user.password = undefined;
//     if (!user) {
//       return res.status(200).send({
//         message: "user not found",
//         success: false,
//       });
//     } else {
//       res.status(200).send({
//         success: true,
//         data: user,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "auth error",
//       success: false,
//       error,
//     });
//   }
// };

module.exports = { LoginController, RegisterController};

