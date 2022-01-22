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
post request
path:/ap1/v1/product/add
params are none
isProtected: true (admin) 
*/

router.post("/add",
    body('name').isLength({ min: 1 }),
    body('price').isNumeric(),
    body('listPrice').isNumeric(),
    body('description').isLength({ min: 10 }),
    body('color').isLength({ min: 4 }),
    body('compatibleWith').isLength({ min: 4 }),
    body('category').isLength({ min: 4 }),
    body('imageUrl').isURL(),
    body('stock').isNumeric()
    , async (req, res) => {

        const { errors } = validationResult(req)

        if (errors.length > 0) return res.status(403).json({ errors, message: "Bad Request" })

        try {
            //isf category exists
            const category = Category.findById(req.body.category)
            if (!category) return res.status(300).json({
                product: null,
                message: 'Invalid Category'
            })
            // console.log(category)
            const product = new Product(req.body)

            await product.save()

            res.status(200).json({ product, message: 'product saved successfully' })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                product: null,
                message: 'Unable to save the product'
            })
        }

    })


export default router