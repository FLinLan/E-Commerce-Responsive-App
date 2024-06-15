const bcryptjs = require('bcryptjs');
const userModel = require("../models/userModel")

async function userSignInController(req,res){
    try{
        const { email, password } = req.body

        if(!email) {
            throw new Error("Please provide email")
        }
        if(!password) {
            throw new Error("Please provide password")
        }

        const user = await userModel.findOne({ email })

        if(!user) {
            throw new Error("User does not exist")
        }

        const checkPassword = await bcryptjs.compare(password, user.password)
        
        console.log("checkPassword", checkPassword)

        if(!checkPassword) {
            throw new Error("Password does not match")
        }

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false, 
        })
    }
}

module.exports = userSignInController