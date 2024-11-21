const mongoose = require("mongoose")
const productModel = require("./productModel")

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: [true, "You must insert Review Title"]
    },

    description: {
        type: String,
        minLength: [10, "description must be more  than 10 characters "]
    },

    rate: {
        type: Number,
        required: [true, "You must provide a rating"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be less than or equal to 5"],
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User  id is Required"]
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product  id is Required"]
    }
}, { timestamps: true })


reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name imageCover"
    })
})

reviewSchema.static.calcAverageRatingsAndQuantity = async function (productId) {
    const result = await this.aggregate({
        $match: { product: productId },
        $group: {
            _id: "$product",
            ratingsAverage: { $avg: "$rating" },
            ratingsQuantity: { $sum: 1 }
        }
    })

    if (result.length > 0) {
        await productModel.findByIdAndUpdate(productId, {
            $set: {
                ratingsAverage: result[0].ratingsAverage.toFixed(2),
                ratingsQuantity: result[0].ratingsQuantity
            }
        })
    } else {
        await productModel.findByIdAndUpdate(productId, {
            $set: {
                ratingsAverage: 0,
                ratingsQuantity: 0
            }
        })
    }
}

reviewSchema.post("save", async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product)
})

reviewSchema.post("findOneAndDelete", async (doc) => {
    await doc.constructor.calcAverageRatingsAndQuantity(doc.product);
});
module.exports = mongoose.model("Review", reviewSchema)

