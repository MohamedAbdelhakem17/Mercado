const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            minLength: [3, "Category name must be at least 3 characters"],
            trim: true,
            unique: [true, "This category already exists"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: {
            type: String,
            required: [true, "Category image is required"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

categorySchema.virtual("id").get(function () {
    return this._id.toHexString();
});

const transform = (doc, ret) => {
    delete ret.id;
    delete ret.__v;
    delete ret.image;
    return ret;
}

categorySchema.set("toJSON", {
    virtuals: true,
    transform
});

categorySchema.set("toObject", {
    virtuals: true,
    transform
});



categorySchema.virtual("imageUrl").get(function () {
    if (this.image) {
        const baseUrl = process.env.WEBSITES_LINK;
        return `${baseUrl}/categories/${this.image}`;
    }
    return null;
});


// Indexes
categorySchema.index({ name: 1, slug: 1 });


module.exports = mongoose.model("Category", categorySchema);
