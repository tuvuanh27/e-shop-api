const Category = require('../models/Category')

const getAllCategories = async (req, res, next) => {
  const categories = await Category.find({})
  return res.status(200).json({ categories })
}

const newCategory = async (req, res, next) => {
  const newCategory = new Category({ ...req.body })
  await newCategory.save()
  return res.status(201).json({
    categoty: newCategory
  })
}

const deleteCategory = async (req, res, next) => {
  await Category.findByIdAndRemove(req.params.id)
  return res.status(200).json({
    success: true,
    message: 'the category is deleted'
  })
}

module.exports = {
  getAllCategories,
  newCategory,
  deleteCategory
}