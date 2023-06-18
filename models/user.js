const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  uid: {
    type: String,
  },
});

userSchema.methods.toJSON = function () {
  const { _id , __v, password, google, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", userSchema);
