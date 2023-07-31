const { request, response } = require("express");
const { Category }          = require("../models");

const getCategories = (req = request, res = response) => {
  try {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    Promise.all([
      Category.countDocuments(query),
      Category.find(query)
        .populate("user", "name")
        .skip(Number(from))
        .limit(Number(limit)),
    ]).then((results) => {
      const [total, categories] = results;

      if (categories.length === 0) {
        return res.status(404).json({
          msg: "No categories found",
        });
      }

      res.json({
        total,
        categories,
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: error,
    });
  }
};

const getCategory = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const query = { _id: id, state: true };

    Promise.all([
      Category.countDocuments(query),
      Category.findOne(query).populate("user", "name"),
    ]).then((results) => {
      const [total, category] = results;

      if (!category) {
        return res.status(404).json({
          msg: `Category with id ${id} not found`,
        });
      }

      res.json({
        total,
        category,
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: error,
    });
  }
};

const postCategory = async (req = request, res = response) => {
  try {
    const name = req.body.name.toUpperCase();
    const dbCategory = await Category.findOne({ name });

    if (dbCategory) {
      return res.status(400).json({
        msg: `Category ${dbCategory.name} already exists`,
      });
    }

    const data = {
      name,
      state: true,
      user: req.uid,
    };

    const category = new Category(data);
    await category.save();

    res.status(201).json({
      msg: "category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: error,
    });
  }
};

const putCategory = async (req = request, res = response) => {
  console.log("putCategory");
  try {
    const { id } = req.params;
    const { _id, _v, state, user, ...rest } = req.body;

    rest.name = rest.name.toUpperCase();
    rest.user = req.uid;

    const dbCategory = await Category.findOne({ name: rest.name });

    if (dbCategory) {
      return res.status(400).json({
        msg: `Category ${dbCategory.name} already exists`,
      });
    }

    Promise.all([
      Category.countDocuments({ _id: id }),
      Category.findByIdAndUpdate(id, rest, { new: true }),
    ]).then((results) => {
      const [total, category] = results;

      if (!category) {
        return res.status(404).json({
          msg: `Category with id ${id} not found`,
        });
      }

      res.json({
        total,
        category,
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: error,
    });
  }
};

const deleteCategory = (req = request, res = response) => {
  try {
    const { id } = req.params;

    Promise.all([
      Category.countDocuments({ _id: id }),
      Category.findByIdAndUpdate(id, { state: false }, { new: true }),
    ]).then((results) => {
      const [total, category] = results;

      if (!category) {
        return res.status(404).json({
          msg: `Category with id ${id} not found`,
        });
      }

      res.json({
        total,
        category,
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: error,
    });
  }
};

const patchCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id, _v, user, ...rest } = req.body;

    if (rest.name) {
      rest.name = rest.name.toUpperCase();
    }

    const dbCategory = await Category.findOne({ name: rest.name });

    if (dbCategory) {
      return res.status(400).json({
        msg: `Category ${dbCategory.name} already exists`,
      });
    }

    rest.user = req.uid;

    Promise.all([
      Category.countDocuments({ _id: id }),
      Category.findByIdAndUpdate(id, rest, { new: true }),
    ]).then((results) => {
      const [total, category] = results;

      if (!category) {
        return res.status(404).json({
          msg: `Category with id ${id} not found`,
        });
      }

      res.json({
        total,
        category,
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
  patchCategory,
};
