const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        cartItem: [
            {
                quantity: {
                    type: Number,
                    default: 1,
                    min: [1, "Quantity must be at least 1."],
                },
                color: {
                    type: String,
                    required: [true, "Please specify a color for the item."],
                },
                price: {
                    type: Number,
                    required: [true, "The price of the item is required."],
                    min: [0, "Price cannot be a negative value."],
                },
                size: {
                    type: String,
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: [true, "Product reference is mandatory."],
                },
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "A user ID is required to associate the cart."],
        },
        totalPrice: {
            type: Number,
            required: [true, "Total price is required for the cart."],
            min: [0, "Total price cannot be negative."],
        },
        totalPriceAfterDiscount: {
            type: Number,
            min: [0, "Discounted total price cannot be negative."],
            validate: {
                validator: function (value) {
                    return !this.totalPrice || value < this.totalPrice;
                },
                message:
                    "The discounted price ({VALUE}) must be less than the original total price.",
            },
        },
    },
    { timestamps: true }
);

// Transform Output
const transform = (doc, ret) => {
    delete ret.__v;
    delete ret._id;
    delete ret.product._id;
    return ret;
};

cartSchema.set("toJSON", {
    virtuals: true,
    transform,
});

cartSchema.set("toObject", {
    virtuals: true,
    transform,
});

// Virtual Field for Discount Percentage
cartSchema.virtual("discountPercentage").get(function () {
    if (this.totalPriceAfterDiscount) {
        return ((this.totalPrice - this.totalPriceAfterDiscount) / this.totalPrice) * 100;
    }
    return 0;
});

// append product Details 
cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: "cartItem.product",
        select: "name price ratingsAverage ratingsQuantity category slug"
    })
})

module.exports = mongoose.model("Cart", cartSchema);
