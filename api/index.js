const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
var cors = require('cors')

app.use(cors())



// Routes links
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const listingRoute = require("./routes/listings");
// const categoryRoute = require("./routes/categories")



dotenv.config();
app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));

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
  filename: (req, file, cb) => {
    // cb(null, req.body.name);
    cb(null, `${Date.now()}_${file.originalname}`)
  },
});
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

const upload = multer({ storage: storage });
try {
  app.post("/api/upload", upload.single("file"), (req, res) => {

    const file = req.file;
  
    if(file){
      res.json(file)
    }else{
  
      throw new Error({msg:"File has been uploaded"});
    }
  })
  
} catch (error) {
  res.status(403).json({msg:error.message})
}


try{

  app.post("/api/multiUpload", upload.array("files", 6), (req, res) => {

    const files = req.files
    if(Array.isArray(files) && files.length > 0){
      res.json(files)
    }else{
      throw new Error("File upload unsuccessful");
    }
  })
}catch (error){
  res.status(403).json({msg:error.message})
}
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/listings", listingRoute);
// app.use("/api/categories",categoryRoute);

app.listen("5003", () => {
  console.log("Backend is running.");
});