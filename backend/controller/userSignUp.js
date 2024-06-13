const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res){
    try{
        const { email, password, name } = req.body

        if(!email) {
            throw new Error("Please provide email")
        }
        if(!password) {
            throw new Error("Please provide password")
        }
        if(!name) {
            throw new Error("Please provide email")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            passsword : hashPassword
        }

        
        const userData = new userModel(paylaod)
        const saveUser = userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error: false,
            message : "User created successfully!"
        })

    }catch(err){
        res.json({
            message : err,
            error : true,
            success : false, 
        })
    }
}

module.exports = userSignUpController