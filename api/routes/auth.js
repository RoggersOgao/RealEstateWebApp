const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
const validator = require('validator')


//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      nationalID: req.body.nationalID,
      phoneNumber: req.body.phoneNumber,
      otherNumber:req.body.otherNumber,
      password: hashedPass,
      isAdmin: req.body.isAdmin
    });


    //validate the data
    if(!req.body.username || !req.body.email || !req.body.nationalID || !req.body.phoneNumber){
      throw Error("All fields are required!!")
    }
    if(!validator.isEmail(req.body.email)){
      throw Error("Please Enter a Valid Email!!")
    }
    if(!validator.isMobilePhone(req.body.phoneNumber,["en-KE"])){
      throw Error("Invalid Number!!")
    }
    if(!validator.isAlpha(req.body.username,["en-US"], { ignore: " " })){
      throw Error("Name should be letters only!!")
    }
    if(!validator.isInt(req.body.nationalID)){
      throw Error("National ID should be a number!!")
    }
    if(!validator.isStrongPassword(req.body.password)){
      throw Error("The password should contain altleast(Capital Letter, specialCharacter, number)")
    }

    if(!newUser){
      throw Error("The user already exists!!")
    }
      //find if the user exists
    const exists = await User.findOne({email: req.body.email});
    const natID = await User.findOne({nationalID: req.body.nationalID})
    if(exists){
      // res.status(403).json({msg: "The user already exists"})
      throw Error("The Email is already in use!!")
    }else if(natID) {
      throw Error("The nationaID is already in use!!")
    }else{
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(403).json({error: err.message});
  }
});


dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(
      {id: user.id, isAdmin: user.isAdmin}, 
    process.env.SECRET_KEY,
      {expiresIn: "1d"}
      );
}

const generateRefreshToken = (user) => {

  return jwt.sign(    
      {id: user.id, isAdmin: user.isAdmin},
      process.env.REFRESH_SECRET_KEY,
  )

}


let refreshTokens = []
//LOGIN
router.post("/login", async (req, res) => {
  try {

    if(!req.body.email || !req.body.password){
      throw Error("All fields must be filled!!")
    }

    const user = await User.findOne({email: req.body.email});

    //throwing an error if the email is wrong

    if(!user){
      throw Error("Invalid username or password!!")
    }
    const validated = await bcrypt.compare(req.body.password, user.password);

    // throwing an error if the password is wrong
    if(!validated){
      throw Error("Invalid username or password!!")
      // !validated && res.status(403).json("Wrong Username or Password!");
    }

    // const { password, ...others } = user._doc; 

    if(user){
      
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user) 
      refreshTokens.push(refreshToken)
      res.json({
          id:user.id,
          username: user.username,
          email:user.email,
          nationalID:user.nationalID,
          phoneNumber:user.phoneNumber,
          otherNumber:user.otherNumber,
          profile:user.profile,
          accessToken,
          refreshToken
      })
    }
    // res.status(200).json(others);
  } catch (err) {
    res.status(403).json({error:err.message});
  }
})


// verify the tokens middleware

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY,(err, user) => {
          if(err){
              return res.status(403).json("Token is not valid")
          }

          req.user = user;
          next()
      })
  }else{
      res.status(401).json("you are not authenticated!");
  }
}


//Admin Login
router.post("/admin/login", async (req, res) => {

  
    try {
  
      if(!req.body.email || !req.body.password){
        throw Error("All fields must be filled!!")
      }
  
      const user = await User.findOne({email: req.body.email, isAdmin: true});
  
      //throwing an error if the email is wrong
  
      if(!user){
        throw Error("Invalid username or password!!")
      }
      const validated = await bcrypt.compare(req.body.password, user.password);
  
      // throwing an error if the password is wrong
      if(!validated){
        throw Error("Invalid username or password!!")
        // !validated && res.status(403).json("Wrong Username or Password!");
      }
  
      // const { password, ...others } = user._doc; 
  
      if(user){
        
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user) 
        refreshTokens.push(refreshToken)
        res.json({
            id:user.id,
            username: user.username,
            email:user.email,
            nationalID:user.nationalID,
            phoneNumber:user.phoneNumber,
            otherNumber:user.otherNumber,
            profile:user.profile,
            accessToken,
            refreshToken
        })
      }
      // res.status(200).json(others);
    } catch (err) {
      res.status(403).json({error:err.message});
    }

})

//refreshing the token

router.post("/refresh", async(req,res) => {
  // step:1  take the refresh token from the user
  const refreshToken = await req.body.token
  
  // step:2 send error if there is not token or it's invalid
  if(!refreshToken) {
      return res.status(401).json("you are not authenticated!")
  }
  if(!refreshTokens.includes(refreshToken)){
      return res.status(403).json("Refresh token is not valid")
  }
  // step:3 if everything is ok, create new access token, refresh token and send to user.
  
  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, async(err, user) => {
  
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateRefreshToken(user)
  
      refreshTokens.push(newRefreshToken)
  
      res.status(200).json({
          accessToken : newAccessToken, refreshToken:newRefreshToken
      })
  })
  
  })


  // logout

router.post("/logout", verify, async(req,res) => {


  try{
    const refreshToken = await req.body.token;
    refreshTokens = refreshTokens.filter((token) => token != refreshToken)
  
    res.status(200).json("You have successfully logged out!!")
  }
  catch(err){
    res.status(500).json(err);
  }
  
})

  module.exports = router;