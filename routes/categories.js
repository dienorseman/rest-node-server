const { Router } = require("express");

const {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
  patchCategory,
} = require("../controllers/categories");
const {
  putCategoryValidators,
  postCategoryValidators,
  deleteCategoryValidators,
  patchCategoryValidators,
} = require("./validators");

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post("/", postCategoryValidators(), postCategory);

router.put("/:id", putCategoryValidators(), putCategory);

router.delete("/:id", deleteCategoryValidators(), deleteCategory);

router.patch("/:id", patchCategoryValidators() , patchCategory);

module.exports = router;
