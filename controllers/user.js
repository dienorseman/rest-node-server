const { request, response } = require("express");
const bcryptjs              = require("bcryptjs");
const User                  = require("../models/user");

const adminGet = async (req = request, res = response) => {
  try {
    let { limit = 5, from = 0 } = req.query;

    const maxLimit = 100;

    if (
      limit > maxLimit ||
      isNaN(limit) ||
      isNaN(from) ||
      from < 0 ||
      limit <= 0 ||
      from > maxLimit ||
      from > limit
    ) {
      limit = maxLimit;
      from = 0;
    }

    const users = await User.find({}, null, { skip: from, limit: limit });

    const total = users.length;

    console.log(`limit: ${limit}, from: ${from} total: ${users.length}`);

    if (users.length === 0) {
      return res.status(404).json({
        msg: "No users found",
      });
    }

    res.json({
      total,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const get = async (req = request, res = response) => {
  try {
    let { limit = 5, from = 0 } = req.query;

    limit = Number(limit);

    from = Number(from);

    const maxLimit = 100;

    if (
      limit > maxLimit ||
      isNaN(limit) ||
      isNaN(from) ||
      from < 0 ||
      limit <= 0 ||
      from > maxLimit ||
      from > limit
    ) {
      limit = maxLimit;
      from = 0;
    }

    let users = await global.serverInstance.randomizedUserList;

    users = users.slice(from, limit);

    if (users.length === 0) {
      return (res = response.status(404).json({
        msg: "No users found",
      }));
    }

    res.json({
      total: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const post = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync(10);

  user.password = bcryptjs.hashSync(password, salt);

  await Promise.all([global.serverInstance.listUsers(), user.save()]);

  res.json({
    user,
  });
};

const put = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, _v, password, google, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const resp = await Promise.all([
    global.serverInstance.listUsers(),
    User.findByIdAndUpdate(id, rest, { new: true }),
  ]);

  res.json({
    user: resp[1],
  });
};

const patch = (req = request, res = response) => {
  res.json({
    msg: "patch - user",
  });
};

const delete_user = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const resp = await Promise.all([
      global.serverInstance.listUsers(),
      User.findByIdAndUpdate(id, { state: false }),
    ]);

    const authUser = req.user;

    res.json({
      message: `User ${resp[1].name} deleted`,
      authUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error deleting user",
      error,
    });
  }
};

module.exports = {
  adminGet,
  get,
  post,
  put,
  patch,
  delete_user,
};
