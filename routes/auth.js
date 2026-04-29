const express= require("express")
const router = express.Router()
const { register } = require('../controllers/authController')        // controller kahan hai?
const { body, validationResult } = require('express-validator')  

const validationHandler = (req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }
    next();
}

router.post("/register",[
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({min:6})
],validationHandler,register
)


module.exports = router



// Step 1: express import karo, router banao done
// Step 2: register function import karo — controller se
// Step 3: body aur validationResult import karo — express-validator se
// Step 4: validationHandler function likho:

// validationResult(req) se errors nikalo
// Agar errors hain → 400 bhejo
// Nahi hain → next() call karo

// Step 5: Route define karo:
// router.post('/register', [teen validation rules], validationHandler, register)
// Step 6: module.exports = router

