import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    listPrice: {
        type: Number,
        required: true,
    },
    descritption: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    compatibleWith: [
        {
            type: String,
        }
    ],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    imageUrl: {
        type: String
    },
    Stock: {
        type: Number,
        required: true
    },
    review: [
        {
            type: mongoose.Types.ObjectId,
            ref: "reviews"
        }
    ]
})

const Product = mongoose.model("Product", CategorySchema)

export default Product;