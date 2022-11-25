const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validator = require("validator");

// verify the tokens middleware

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated!");
  }
};

//CREATE Message
router.post("/", verify, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(403).json({err:err.message});
  }
});

//DELETE Message
router.delete("/:id", verify, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (req.user.isAdmin) {
      try {
        await Message.delete();
        res.status(200).json("Property has been deleted...");
      } catch (err) {
        res.status(403).json({ error: err.message });
      }
    } else {
      throw new Error({ msg: "Something went wrong!!" });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

//GET Message
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET ALL MessageS
router.get("/", async (req, res) => {
  const username = req.query.u;

  try {
    let messages;
    if (username) {
      messages = await Message.find({ userId: username });
    }
    else {
      messages = await Message.find();
    }
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
