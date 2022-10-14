
const router = require("express").Router();
const User = require("../models/User");
const Listing = require("../models/Listing");
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


//CREATE Listing
router.post("/", verify, async (req, res) => {
  const newListing = new Listing(req.body);
  try {
    const savedListing = await newListing.save();
    res.status(200).json(savedListing);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE Listing
router.put("/:id", verify, async (req, res) => {

  try {
    const listing = await Listing.findById(req.params.id);
    if (listing.id === req.body.id || req.user.isAdmin) {
      try {
        const updatedListing = await Listing.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedListing);
      } catch (err) {
        res.status(500).json(err);

      }
    } else {
      throw new Error("You can only update your own Property!!");
    }
  } catch (err) {
    res.status(500).json({msg:err.message});
  }

});

//DELETE Listing   
router.delete("/:id", verify, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (listing.id === req.body.id || req.user.isAdmin) {
      try {
        await Listing.delete();
        res.status(200).json("Property has been deleted...");
      } catch (err) {
        res.status(403).json({error:err.message});
      }
    } else {
      throw new Error({msg:"You can delete only your Listing!!"});
    }
  } catch (err) {
    res.status(403).json({error:err.message})
  }
});

;
//GET Listing
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({error:err.message});
  }
});

//GET ALL ListingS
router.get("/", async(req, res) => {
  const username = req.query.user;
  const propertyState = req.query.propertyState;
  try {
    let listings;
    if (username) {
      listings = await Listing.findAll({userId:username});
    }else if(propertyState){
        listings = await Listing.findAll({propertyState:propertyState});
    }
    else {
      listings = await Listing.find();
    }
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({error:err.message});
  }
});

module.exports = router;
