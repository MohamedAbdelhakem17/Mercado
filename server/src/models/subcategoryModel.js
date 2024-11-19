const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "subCategory name is required"],
            minLength: [3, "subCategory name must be at least 3 characters"],
            trim: true,
            unique: [true, "This subcategory already exists"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        category: {
            ref: "Category",
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "must insert Category"]
        }
    },
    { timestamps: true }
);

const transform = (doc, ret) => {
    delete ret.id;
    delete ret.__v;
    delete ret.category.imageUrl;
    return ret;
}

subcategorySchema.set("toJSON", {
    virtuals: true,
    transform
});

subcategorySchema.set("toObject", {
    virtuals: true,
    transform
});

subcategorySchema.pre(/^find/, function (next) {
    this.populate({
        path: "category",
        select: "name"
    })
    
    next()
});

// Indexes
subcategorySchema.index({ name: 1, slug: 1 });

module.exports = mongoose.model("Subcategory", subcategorySchema);
