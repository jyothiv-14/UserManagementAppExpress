let User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


let register = async (req,res) => {
    // let email = req.body.email
    // let name = req.body.name
    // let password = req.body.password


    let {email,name,password} = req.body
    console.log(email, name, password);


    //to encrypt the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let user = new User({email,name,password})
    await user.save()

    //to generate JWT token

    let payload = {id:user.id}


    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn:'1h'
        },(err,token) => {
            if(err){
                throw err
            }
            else{
                res.send(token)
            }
        }

    ).catch(() => console.log('Error signing jwt'))


    res.send(user)
}




let login = async (req,res) => {
    let {inp_email,inp_password} = req.body

    let user = await User.findOne({email:inp_email})


    let isValidPwd = await bcrypt.compare(inp_password, user.password)

    //let user = await User.findOne({email:inp_email,password:inp_password})
    if (!isValidPwd){
        res.status(400).send("User not found")
    }
    else{
        // res.status(200).json(user)
        let payload = {id:user.id}


        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:'1h'
            },(err,token) => {
                if(err){
                    throw err
                }
                else{
                    res.send(token)
                }
            }

        ).catch(() => console.log('Error signing jwt'))
    }
}

let profile = async (req,res) => {
    // const user = await User.findOne(
    //     {"email":req.body.email}
    // )
    // res.status(200).json(user)

    res.status(200).send(req.user)
}

let transaction = async (req,res) => {
    res.status(200).send("This is Transaction Page")
}

let wishlist = async (req,res) => {
    res.status(200).send("This is Wishlist Page")
}


module.exports = {
    register,
    login,
    profile,
    transaction,
    wishlist
}