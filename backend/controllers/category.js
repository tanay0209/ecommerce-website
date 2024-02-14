const Category = require("../models/category")

exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec((error,category)=>{
        if (error) {
            return res.status(400).json({
                error:"Category not found"
            })
        }
        req.category = category
        next()
    })
}

exports.createCategory = (req,res) =>{
    const category = new Category(req.body)
    category.save((error,category)=>{
        if (error) {
            res.status(400).json({
                error:"Not able to create category"
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req,res) =>{
    return res.json(req.category);
}

exports.getAllCategory =(req,res) =>{
    Category.find().exec((error,categories)=>{
        if (error) {
            return res.status(400).json({
                error:"No categories found"
            })
        }
        res.json(categories)
    })
}


exports.updateCategory = (req,res) =>{
    const category = req.category
    category.name = req.body.name
    category.save((error,updatedCategory)=>{
        if (error) {
            return res.status(400).json({
                error:"Not able to update category"
            })
        }
        res.json(updatedCategory)
    })
}


exports.removeCategory = (req,res) =>{
    const category = req.category
    category.remove((error,category)=>{
        if (error) {
            return res.status(400).json({
                error:"Not able to delete the category"
            })
        }
        res.json({
            message:`Successfully deleted the category ${category.name}`
        })
    })
}

