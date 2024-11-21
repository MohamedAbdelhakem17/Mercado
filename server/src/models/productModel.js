const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

// Define Product Schema
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            minLength: [8, "The title must have at least 8 characters."],
            maxLength: [35, "The title must not exceed 35 characters."],
            required: [true, "A product title is required."]
        },
        slug: {
            type: String,
            lowercase: true
        },
        description: {
            type: String,
            required: [true, "A product description is required."],
            minlength: [20, "The description must have at least 20 characters."]
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: [true, "A category must be specified for the product."]
        },
        subcategories: [
            {
                type: ObjectId,
                ref: "Subcategory"
            }
        ],
        brand: {
            type: ObjectId,
            ref: "Brand"
        },
        price: {
            type: Number,
            min: [1, "The price must be greater than 0."],
            max: [100000, "The price must be less than 100,000."],
            required: [true, "The product price is required."]
        },
        priceAfterDiscount: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value < this.price;
                },
                message: "The discount price ({VALUE}) must be less than the original price."
            }
        },
        imageCover: {
            type: String,
            required: [true, "A cover image for the product is required."],
        },
        images: {
            type: [String],
            default: []
        },
        ratingsAverage: {
            type: Number,
            min: [1, "Ratings must be at least 1.0."],
            max: [5, "Ratings must not exceed 5.0."]
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        colors: {
            type: [String],
            default: []
        },
        sizes: {
            type: [String],
            default: []
        },
        sold: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            min: [0, "Quantity cannot be negative."],
            required: [true, "The product quantity is required."]
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Transform Output
const transform = (doc, ret) => {
    delete ret.id;
    delete ret.__v;
    delete ret.category._id;
    return ret;
};

productSchema.set("toJSON", {
    virtuals: true,
    transform
});

productSchema.set("toObject", {
    virtuals: true,
    transform
});
// Virtual Field for Discount Percentage
productSchema.virtual("discountPercentage").get(function () {
    if (this.priceAfterDiscount) {
        return ((this.price - this.priceAfterDiscount) / this.price) * 100;
    }
    return 0;
});

// Image URL Formatting Hook
productSchema.pre(["init", "save"], (doc) => {
    if (doc.imageCover) doc.imageCover = `${process.env.WEBSITES_LINK}/products/${doc.imageCover}`;

    if (doc.images) doc.images = doc.images.map(image => `${process.env.WEBSITES_LINK}/products/${image}`);

});



// Indexes
productSchema.index({ title: 1, slug: 1 });
productSchema.index({ category: 1 });

// product Reviews 
productSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
    justOne: false,
});

// select Category name
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "category",
        select: "name",
    });
    next();
});

// Export Model
module.exports = mongoose.model("Product", productSchema);
