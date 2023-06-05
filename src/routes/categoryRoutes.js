import express from "express"
import Category from "../services/mongoDB/models/Category"
import { body, validationResult } from "express-validator"
import isAdmin from "../middlewares/isAdmin"

const router = express.Router()
/* 
get request
path:/ap1/v1/category/all
params are none
isProtected: false 
*/

router.get("/all", isAdmin, async (req, res) => {
    try {
        const categories = await Category.find({})
        return res.json({ categories, message: "Successfully fetched categories" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            categories: [],
            message: "error fetching categories"
        })
    }
})

/* 
post request
path:/ap1/v1/category/add
params are none
isProtected: true (admin) 
*/

router.post("/add", isAdmin,
    body('name').isLength({ min: 1 }),
    body('description').isLength({ min: 10 })
    , async (req, res) => {

        const { errors } = validationResult(req)

        if (errors.length > 0) return res.status(403).json({ errors, message: "Bad Request" })

        try {
            const { name, description } = req.body
            const category = new Category({ name, description })

            await category.save()

            res.status(200).json({ category, message: 'category saved successfully' })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                category: [],
                message: 'Unable to save the category'
            })
        }

    })

/* 
put request
path:/ap1/v1/category/update/:id
params are none
isProtected: true (admin) 
*/

router.put("/update/:id"
    , async (req, res) => {

        const { id } = req.params
        try {
            const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
                new: true
            })
            res.status(200).json({ category, message: 'category updated successfully' })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                category: null,
                message: 'Unable to update the category'
            })
        }
    })


/* 
delete request
path:/ap1/v1/category/delete/:id
params are none
isProtected: true (admin) 
*/

router.delete("/delete/:id"
    , async (req, res) => {

        const { id } = req.params
        try {
            const category = await Category.findOneAndRemove({ id })
            res.status(200).json({ category, message: 'deleted category successfully' })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                category: null,
                message: 'Unable to delete the category'
            })
        }
    })

export default router