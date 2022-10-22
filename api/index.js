const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
var cors = require('cors')
const path = require("path");
app.use(cors())

// Routes links
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const listingRoute = require("./routes/listings");
// const categoryRoute = require("./routes/categories")


dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "./images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));



  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"_"+file.originalname)
    }
  });
  
  // filter part by image type
const filefilter = (req, file, cb) => {
  
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
  } else {
      cb(null, false);
      const err = new Error('Only .png, .jpg and .jpeg format allowed!')
      err.name = 'ExtensionError'
      return cb(err);
  }
}

// filter by size
const limit = { fileSize: 20 * 1024 * 1024 } // 4MB

const upload = multer({storage:storage, fileFilter:filefilter, limits:limit}).array("file")

  app.post("/api/upload", function (req, res) {

    try{
      upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              res.status(403).send({ error: { message: `Uploading Error: ${err.message}` } })
              return;
          } else if (err) {
              // An unknown error occurred when uploading.
              if (err.name == 'ExtensionError') {
                  res.status(413).send({ error: err.message })
              } else {
                  res.status(500).send({ error: `unknown uploading error: ${err.message}` })
              }
              return;
          }
          
          // console.log(req.files)
          // console.log(req.body)
  
          res.status(200).json(req.files)
      })
  
    }catch(err){
      res.status(403).json({error: err.message})
    }

  });
  


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/listings", listingRoute);
// app.use("/api/categories",categoryRoute);

app.listen("5003", () => {
  console.log("Backend is running.");
});