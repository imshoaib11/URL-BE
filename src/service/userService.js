import auth from "../common/auth.js";
import userModel from "../model/userModel.js";
import nodemailer from 'nodemailer'

const getAllUsers = async(req,res) => {
    try{
        let users = await userModel.find({},{password:0})

    res.status(200).send({
        message: "All users fetched successfully",
        data: users
    })
}
    catch(err){
        res.status(500).send({
            message: err.message || "Internal Server Error",
        })
    }
}

const createUser = async (req, res) => {
    try{
        let user = await userModel.findOne({email:req.body.email});
        if(!user)
        {
            req.body.password = await auth.hash(req.body.password)
            await userModel.create(req.body)

            res.status(201).send({message: "User Created Successfully"});
        }
        else
        {
            res.status(400).send({message: `User already exists with the ${req.body.email}`});
            
        }
    }
    catch(error){
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
}

const loginUser = async(req,res) =>{
    try{
        let user = await userModel.findOne({email: req.body.email})
        
       if(user){
            //validate Password using bcrypt compare
            if(await auth.compareHash(req.body.password,user.password))
                {
                    res.status(201).send({
                        message: "Login Successful"
                    })
                }
            else
            {
                res.status(401).send(
                    {
                        message: "Incorrect Password"
                    }
                )
            }
       }
       else{
        res.status(400).send(
            {
                message: "User Doesnot Exists"
            })  
        } 
       
    }
    catch(error){
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
}
    
const sendLink = async(req,res) =>{
    const {email} = req.body;
    const user = await userModel.findOne({email: email}); 

    if(!user){
        res.status(400).send({message: "User Doesnot Exists"})
    }

    const token = Math.random().toString(36).slice(-8)
    user.resetToken = token
    user.save()


    
    //localhost:5173/reset
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shoaib7337r.k.o@gmail.com',
          pass: 'tqvx raby wini zbpy'
        }
      });
      
      var mailOptions = {
        from: 'shoaib7337r.k.o@gmail.com',
        to: user.email,
        subject: 'Password Reset',
        text: `Your token is ${token} Click on the link https://jovial-cactus-60412c.netlify.app/ and enter your token and your reset your password`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).send({
            message: error.message || "Internal Server Error"
          })
        } else {
          res.status(201).send({
            message: `Link sent to email: ${user.email}`
          })
        }
      });
}

// const verifyKey = async(req,res) =>{
//     const {email} = req.body;
//     const user = await userModel.findOne({email: email});
//     const {token} = req.body

//     if(token==key){
//         res.status(201).send({
//             message: "Key Matched",
//         })
//         user.password = token
//         user.save()
//     }
//     else{
//         res.status(404).send({
//             message: "Wrong Key"
//         })
//     }
// }

const resetPassword = async(req,res) =>{
    try{
        const {token} = req.body
        
        const user = await userModel.findOne({resetToken:token})
        const {newPassword} = req.body

        if(!user){
            res.status(404).send({
                message: "Invalid Token"
            })
        }
        // if(!newPassword){
        //     res.status(404).send({
        //         message: "Please enter the New Password"
        //     })
        // }
        else{
            user.resetToken = null
            const hashedPassword = await auth.hash(newPassword)

            user.password = hashedPassword
           
            user.save()

            res.status(201).send({
                message: "Password Reset Successfull"
            })
        }
            
            

            
    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}
export default {
    getAllUsers,
    createUser,
    loginUser,
    sendLink,
    // verifyKey,
    resetPassword
}