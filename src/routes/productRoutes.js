import express from "express"
const router = express.Router()
import { body, validationResult } from "express-validator"
import Product from "../services/mongoDB/models/Product"
import Category from "../services/mongoDB/models/Category"

/* 
get request
path:/ap1/v1/product/all
params are none
isProtected: false 
*/

router.get("/all", async (req, res) => {
    try {
        const products = await Product.find({})
        return res.json({ products, message: "Successfully fetched products" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            products: [],
            message: "error fetching products"
        })
    }
})

/* 
get request
path:/ap1/v1/product/all
query:categoryID
params are none
isProtected: false 
*/

router.get("/all", async (req, res) => {
    try {
        const { categoryId } = req.query
        const products = await Product.find({ category: categoryId })
        return res.json({ products, message: "Successfully fetched products" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            products: [],
            message: "error fetching products"
        })
    }
})

/* 
post request
path:/ap1/v1/product/add
params are none
isProtected: true (admin) 
*/
router.post('/add',
    body('name').isLength({ min: 1 }),
    body('price').isNumeric(),
    body('listPrice').isNumeric(),
    body('stock').isNumeric(),
    body('description').isLength({ min: 10 }),
    body('color').isLength({ min: 1 }),
    body('category').isLength({ min: 5 }),
    body('imageUrl').isURL(),
    async (req, res) => {

        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(403).json({ errors, message: "Bad request" })

        try {
            // check if category exists
            const category = await Category.findById(req.body.category)

            if (!category) return res.status(300).json({
                product: null,
                message: "Invalid category"
            })
            const product = new Product(req.body);
            await product.save()
            res.status(200).json({
                product, message: "Product saved successfully"
            })
        } catch (error) {
            return res.status(500).json({
                product: null,
                message: "Unable to save product"
            })
        }
    })
/* 
put request
path:/ap1/v1/product/:id
params id
isProtected: true (admin) 
*/
router.put("/update/:id"
    , async (req, res) => {
        if (req.body.category) {
            const category = await Category.findById(req.body.category)
            if (!category) return res.status(300).json({
                product: null,
                message: "Invalid category"
            })
        }
        const { id } = req.params
        try {
            const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
                new: true
            })
            res.status(200).json({ product, message: 'product updated successfully' })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                product: null,
                message: 'Unable to update the product'
            })
        }
    })

/* 
delete request
path:/ap1/v1/product/:id
params id
isProtected: true (admin) 
*/

router.delete("/delete/:id"
    , async (req, res) => {

        const { id } = req.params
        try {
            const product = await Product.findOneAndRemove({ id })
            res.status(200).json({ product, message: 'deleted product successfully' })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                product: null,
                message: 'Unable to delete the product'
            })
        }
    })

/* 
put request
path:/ap1/v1/updateStock/:id
params id
isProtected: true (admin) 
*/

// router.delete("/updateStock/:id"
//     , async (req, res) => {

//         const { id } = req.params
//         try {
//             const product = await Product.findOneAndRemove({ id })
//             res.status(200).json({ product, message: 'deleted product successfully' })
//         } catch (error) {
//             console.log(error.message)
//             return res.status(500).json({
//                 product: null,
//                 message: 'Unable to delete the product'
//             })
//         }
//     })

export default router