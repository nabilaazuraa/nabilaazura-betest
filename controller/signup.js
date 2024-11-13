const User = require("../database/model/user");
const mongoose = require("mongoose")

const { createSecretToken } = require("../tokenGeneration/generateToken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    if (
      !(
        req.body.userName &&
        req.body.accountNumber &&
        req.body.emailAddress &&
        req.body.identityNumber
      )
    ) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ emailAddress : req.body.emailAddress });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    // const salt = 10;
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        id: new mongoose.Types.ObjectId().toString(),
        userName: req.body.userName,

        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
    });
    const user = await newUser.save();
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });

    console.log("cookie set succesfully");

    res.json(user);
  } catch (error) {
    console.log("Gott an error", error);
  }
};
module.exports = createUser;