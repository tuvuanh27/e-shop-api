const router = require('express-promise-router')()

const categoryController = require('../controllers/category')

router.route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.newCategory)

router.route('/:id') 
  .get(categoryController.getCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory)

module.exports = router

