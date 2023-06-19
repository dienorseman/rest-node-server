const { response } = require("express");

const User = require("../models/user");

const checkUserState = async (req, res = response, next) => {
  const uid = req.params.id;

  const user = await User.findById(uid);

  if (!user.state) {
    return res.status(401).json({
      msg: "User is inactive already",
    });
  }

  next();
};

// check if user is active in db by email

const checkUserStateByEmail = async (req, res = response, next) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user.state) {
        return res.status(401).json({
            msg: "User is inactive.",
        });
    }

    next();

}

module.exports = {
  checkUserState,
    checkUserStateByEmail
};
