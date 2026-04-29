const bcrypt = require("bcryptjs");

const User = require("../models/user");

const register = async (req,res)=>{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(409).json({
                message:"Email already in use",
            })
        }

const hashedPassword = await bcrypt.hash(password,12)

const user = new User({
    name,
    email,
    password:hashedPassword,
})

await user.save();

res.status(201).json({
  message: 'User registered successfully',
  userId: user._id
})

}
module.exports = {register};
// Step 1: Request se data nikalo
//         (name, email, password — req.body me hoga)
//              ↓
// Step 2: Email pehle se exist karta hai?
//         (DB me dhundo)
//              ↓
//         Agar haan → 409 bhejo → STOP
//         Agar nahi → aage jao
//              ↓
// Step 3: Password hash karo
//         (plain text kabhi save nahi karte)
//              ↓
// Step 4: Naya user banao + save karo
//         (DB me store karo)
//              ↓
// Step 5: Response bhejo
//         (201 + message + userId)