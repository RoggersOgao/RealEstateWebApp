const router = require("express").Router();
const User = require("../models/User");
const Listing = require("../models/Listing");
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

//CREATE Listing
router.post("/", verify, async (req, res) => {
  try {
    const newListing = new Listing(req.body);

    if (
      !req.body.propertyState ||
      !req.body.propertyType ||
      !req.body.propertyName ||
      !req.body.address ||
      !req.body.location ||
      !req.body.bedrooms ||
      !req.body.bathrooms ||
      !req.body.price ||
      !req.body.propertySize ||
      !req.body.description ||
      !req.body.img ||
      !req.body.features
    ) {
      throw Error("All fields are required!!")
    }
    if(!validator.isAlpha(req.body.propertyName,["en-US"], { ignore: " " })){
      throw Error("Name should be letters only!!")
    }
    if(!validator.isInt(req.body.bedrooms)){
      throw Error("No. Bedrooms should be a number!!")
    }
    if(!validator.isInt(req.body.bathrooms)){
      throw Error("No. Bathrooms should be a number!!")
    }
    if(!validator.isInt(req.body.price)){
      throw Error("The price should be a number!!")
    }
    // if(!validator.isInt(req.body.price, [ {min:5000, max:75000000}])){
    //   throw Error("The price is out of range!!")
    // }
    const savedListing = await newListing.save();
    res.status(200).json(savedListing);
  } catch (err) {
    res.status(403).json({err:err.message});
  }
});

//UPDATE Listing
router.put("/:id", verify, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (req.user.id === req.body.id || req.user.isAdmin) {
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
    res.status(500).json({ msg: err.message });
  }
});

//DELETE Listing
router.delete("/:id", verify, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (listing.id === req.body.id || req.user.isAdmin) {
      try {
        await listing.delete();
        res.status(200).json("Property has been deleted...");
      } catch (err) {
        res.status(403).json({ error: err.message });
      }
    } else {
      throw new Error({ msg: "You can delete only your Listing!!" });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

//GET Listing
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET ALL ListingS
router.get("/", async (req, res) => {
  const username = req.query.u;
  const propertyState = req.query.propertyState;
  const property = req.query.p;
  try {
    let listings;
    if (username) {
      listings = await Listing.find({ userId: username });
    } else if (propertyState) {
      listings = await Listing.find({ propertyState: propertyState });
    }  else if(property){
      listings = await Listing.find({ _id:property})
    }
    else {
      listings = await Listing.find();
    }
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
