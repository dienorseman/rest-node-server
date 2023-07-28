const { request, response } = require("express");

const bcryptjs = require("bcryptjs");

// jwt
const { generateJWT } = require("../helpers/generate-jwt");

const User = require("../models/user");

const { googleVerify } = require("../helpers/google-verify");

const post = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // check if email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Email or password is incorrect",
      });
    }

    // check if user is active
    if (!user.state) {
      return res.status(400).json({
        msg: "Email or password is incorrect",
      });
    }

    // check if password is correct
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Email or password is incorrect",
      });
    }

    // generate JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: `Welcome ${user.name}!`,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const token = req.token;

  try {
    const { name, email, picture } = await googleVerify(token);

    let user = await User.findOne({ email });

    if (!user) {
      // create user
      const data = {
        name,
        email,
        password: ":P",
        img: picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // check if user is active

    if (!user.state) {
      return res.status(401).json({
        msg: "User is not active",
      });
    }

    // generate JWT
    const tokenJWT = await generateJWT(user.id);

    res.json({
      user,
      tokenJWT,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Google token is not valid",
    });
  }
};

module.exports = {
  post,
  googleSignIn,
};
