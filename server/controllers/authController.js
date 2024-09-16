const User=require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register endpoint
const register=async(req,res)=>{
    try {
        const { name, email, password, confirm_password } = req.body;

        //check for name
        if(!name){
            return res.json({
                "error":"Name is required"
            })
        }
        //check email
        if(!email){
            return res.json({error:'Email is required'})
        }
        //check for password
        if(!password||password.length<6){
            return res.json({
                "error":"Password is required and should be atleast 6 character long"
            })
        }
        //check if password is confirmed
        if(confirm_password!==password){
            return res.json({
                error:'Confirm Password does not match with password'
            })
        }
        //check if email already exist
        const exist= await User.findOne({email})
        if(exist){
            return res.json({
                "error":"Email already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.json({ message: 'User registered successfully' });
        } catch (error) {
        return res.status(500).json({ error: 'Registration failed' });
        }
}
//login endpoint
const login=async(req,res)=>{
    try {
        const { email, password } = req.body;
        //check email if entered
        if(!email){
            return res.json({
                error:'email is required'
            })
        }
        //check password
        if(!password){
            return res.json({
                error:'password is required'
            })
        }
        //check user in db
        const user = await User.findOne({ email });
        if (!user) {
        return res.json({ error: 'No User found' });
        }
        //password verification
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.json({ error: 'Wrong Password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        
        return res.json({ token, user });
        // return res.cookie('token',token).json(user)

        } catch (error) {
        return res.status(500).json({ error: 'Login failed' });
        }
}



module.exports={
    login,
    register
}