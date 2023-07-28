const { response } = require("express");

const { Product } = require("../models");

const getProducts = async (req, res = response) => {
  try {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate("user", "name")
        .populate("category", "name")
        .skip(Number(from))
        .limit(Number(limit)),
    ]);

    res.json({
      total,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const getProduct = async (req, res = response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("user", "name")
      .populate("category", "name");

    res.json({
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const createProduct = async (req, res = response) => {
  try {
    const { state, user, ...body } = req.body;

    body.name = body.name.toUpperCase();

    const product = await Product.findOne({ name: body.name })
      .populate("user", "name")
      .populate("category", "name");

    if (product) {
      return res.status(400).json({
        msg: `Product ${product.name} already exists`,
      });
    }

    const data = {
      ...body,
      name: body.name,
      user: req.uid,
    };

    const newProduct = new Product(data);

    await newProduct.save();

    res.status(201).json({
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const updateProduct = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if (data.name) {
      data.name = data.name.toUpperCase();
    }

    Promise.all([
      Product.findByIdAndUpdate(id, data, { new: true })
        .populate("user", "name")
        .populate("category", "name"),
    ]).then((results) => {
      const [product] = results;

      if (!product) {
        return res.status(404).json({
          msg: `Product with id ${id} not found`,
        });
      }

      res.json({
        product,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const deleteProduct = async (req, res = response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    )
      .populate("user", "name")
      .populate("category", "name");

    res.json({
      msg: `Product with id ${id} deleted`,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
