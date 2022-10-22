const router = require("express").Router();
const User = require("../models/User");
const Listing = require("../models/Listing");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")



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
//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Listing.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET ALL USERS 

router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let users;
    if (username) {
      users = await User.find({ username });
    } else {
      users = await User.find();
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;