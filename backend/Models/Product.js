const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ProductSchema=new Schema({
     name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})
const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;