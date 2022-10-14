
const router = require("express").Router();
const User = require("../models/User");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


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


//CREATE Category
router.post("/", verify, async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE Category
router.put("/:id", verify, async (req, res) => {

  try {
    const Category = await Category.findById(req.params.id);
    if (Category.id === req.body.id || req.user.isAdmin) {
      try {
        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCategory);
      } catch (err) {
        res.status(500).json(err);

      }
    } else {
      res.status(401).json("You can only update Category");
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

//DELETE Category   
router.delete("/:id", verify, async (req, res) => {
  try {
    const Category = await Category.findById(req.params.id);
    if (Category.id === req.body.id || req.user.isAdmin) {
      try {
        await Category.delete();
        res.status(200).json("Category has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Category!!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

;
//GET Category
router.get("/:id", async (req, res) => {
  try {
    const Category = await Category.findById(req.params.id);
    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CategoryS
router.get("/", async(req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Categorys;
    if (username) {
      Categorys = await Category.find({ username });
    } else if (catName) {
      Categorys = await Category.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Categorys = await Category.find();
    }
    res.status(200).json(Categorys);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
