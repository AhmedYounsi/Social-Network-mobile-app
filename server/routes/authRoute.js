const express = require("express");
const mongoose = require("mongoose");
const { jwtkey } = require("../keys");
const router = express.Router();
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password,username} = req.body;

  const hashPassowrd = await bcrypt.hash(password, 10);
  try {
    const user = new User({ email, username,password: hashPassowrd });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});





router.post("/login", async (req, res) => {
  const { email, password } = await req.body;
  const user = await User.findOne({ email: email });
  //  Email Exist?
  if (user) {
    const passwords_compare = await bcrypt.compare(password, user.password);
    if(passwords_compare)
    {
      const token = jwt.sign({ userId: user._id }, jwtkey);
       res.status(200).send({token});
    }
   
     else  res.status(404).send("Incorrect password");
  } else {
    res.status(404).send("Email not found");
  }
});



router.post("/LikePost", async (req, res) => {
 


});

module.exports = router;
