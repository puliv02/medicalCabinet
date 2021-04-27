const User = require('../models/User')
const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// const { default: User } = require('../models/User');

const addUser = async (req, res) => {
    try {
        const { name, email, password, passwordVerify } = req.body;

        // validation of fields
        if (!name || !email || !password || !passwordVerify) {
            return res.status(400).json({ message: " Please fill all the required fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: " please enter a password of atleast 6 characters" });
        }

        if (password !== passwordVerify) {
            return res.status(400).json({ message: " Please enter the same password twice" });
        }

        // check if user exists

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: " An user with this email already exists " });

        //hash password using bcypt

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        console.log(bcrypt.hash);
        const newUser = new User({
            name, email,
            password: passwordHash
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        //login the user once he registers

        //sign the token

        const token = jwt.sign(
            {
                user: savedUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },);

        console.log(token);


        // //send the token as cookie
        // res.cookie("token", token, { httpOnly: true, }).send()
       res.json({token,
            user : {
             id : savedUser._id,
             name : savedUser.name,
             email : savedUser.email
        }
    });

    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }

}

//login user

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validate 
        if (!email || !password) {
            return res.status(400).json({ message: " Please fill all the required fields" });
        }
        // check if user exists

        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).json({ message: " Wrong email or password" })

        // check if passoword matches
        const isPwdCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPwdCorrect)
            return res.status(401).json({ message: " Wrong email or password" });

        //sign token

        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },);

        //send the token as cookie
        // res.cookie("token", token, { httpOnly: true, }).send()
        res.json({token,
            user : {
             id : existingUser._id,
             name : existingUser.name,
             email : existingUser.email
        }
    });

    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

//logout user for cookies case
// const logout = (req, res) => {
//     res.cookie("token", "", { httpOnly: true, expires: new Date(0), }).send();
// }

//accessing user's dashboard after login - private route, hence token verification required
const dashboard = (req,res) => {
    const header = req.headers['authorization'];
    console.log(header)
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, process.env.JWT_SECRET , function(err, decoded) {
            if(err){
                console.log(err)
                res.sendStatus(403)
            }
            else{
                console.log(decoded)
                res.json({
                    message: 'Token verified!'
                });
            }
        }) //end of jwt.verify
    }
    else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }//missing token in the header
    
}

module.exports = {
    addUser,
    loginUser,
    dashboard
}