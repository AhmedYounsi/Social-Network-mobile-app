const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./models/user");
require("./models/post");
const authRoutes = require("./routes/authRoute");
const PORT = process.env.PORT || 5000;
// MODELS
const User = mongoose.model("User");
const Post = mongoose.model("Post");
// END MODELS
const cors = require("cors");
const server = require("http").createServer(app);
app.use(cors());

const requireToken = require("./middleware/requireToken");

// INIT cloudinary
const cloudinary = require("cloudinary").v2;
// cloudinary set
cloudinary.config({
  cloud_name: "dk27fusnr",
  api_key: "433181138836466",
  api_secret: "vvEdG1OH_NZ0kTgm-fbo3HA55wQ",
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(authRoutes);
mongoose.connect(
  "mongodb+srv://hamouda:hamouda@cluster-react.yidsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("connected to mongoose");
});

app.get("/get_profile", requireToken, (req, res) => {
  res.send(req.user);
});

app.get("/all_user", requireToken, async (req, res) => {
  const user = await User.find();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(user);
});

app.post("/post", requireToken, async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.data);
  try {
    const post = new Post({
      description: "new post",
      posted_by_id: req.body.user_id,
      posted_by: req.body.user,
      images: result.asset_id,
      cloud_id: result.public_id,
      images_url: result.secure_url,
      date: Date.now(),
    });
    await post.save();
    console.log("post_saved");
    res.status(200).send("posted !");
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

app.post("/UserById", requireToken, async (req, res) => {
  console.log(req.body.id)
    const user = await User.findById(req.body.id)
  
    const posts = await  Post.find({ posted_by_id: req.body.id }).sort({ _id: -1 })
     const data = {
       posts ,
       user
     }
    res.send(data)
});

app.get("/Get_Posts", requireToken, async (req, res) => {
  Post.find()
    .sort({ _id: -1 })
    .then((posts) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(posts).status(200);
    });
}); 

app.get("/PostUser", requireToken, async (req, res) => {
  Post.find({ posted_by_id: req.user._id })
    .sort({ _id: -1 })
    .then((posts) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(posts).status(200);
    });
});

 
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("message", () => {
    socket.emit("message", "socket work !");
  });

   
  


  socket.on("COMMENT", async (data)=>{
   
    const user = await User.findById(data.user_id)
    
 
const newId2 = new mongoose.Types.ObjectId();
 
   const comment = {
     _id : newId2,
     user_id : data.user_id,
     comment : data.CommentText,
     user 
   }

    Post.findByIdAndUpdate(
      data.post_id,
     {  $push: { comments: comment } } , { new : true }  ).then(data=>{
      io.emit('COMMENT',data)
     // socket.broadcast
     })
   
  })


  socket.on('LIKE_POST', async (data)=>{
    
    const liked_post = await Post.findById(data.post_id)
    if(!liked_post.likes.includes(data.user_id))
  
    {
  
     Post.findByIdAndUpdate(
       data.post_id,
      {  $push: { likes: data.user_id } } , { new : true }  ).then(data=>{
        socket.emit('LIKE_POST',data)
      // socket.broadcast
      })
    }
    else 
    {
     
     Post.findByIdAndUpdate(
       data.post_id,
      {  $pull: { likes: data.user_id } } , { new : true }  ).then(data=>{
        socket.emit('LIKE_POST',data)
      })
    }


  })
});
 

server.listen(PORT, () => {
  console.log("app is running ..");
});
