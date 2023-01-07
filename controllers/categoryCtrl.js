const Category = require('../models/categoryModel')
const Products = require('../models/productModel')
const User = require('../models/userModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const category = await Category.find()
            res.json(category)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) => {
        try {
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "The category already exist"})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Created a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res)  => {
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete related products first."
            })
            
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted the category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res)  => {
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated the category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl