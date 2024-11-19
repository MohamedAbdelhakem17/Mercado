const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Brand name is required"],
            minLength: [2, "Brand name must be at least 2 characters"],
            trim: true,
            unique: [true, "This Brand already exists"],
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

brandSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

const transform = (doc, ret) => {
    delete ret.id;
    delete ret.__v;
    delete ret.image;
    return ret;
}

brandSchema.set("toJSON", {
    virtuals: true,
    transform
});

brandSchema.set("toObject", {
    virtuals: true,
    transform
});



brandSchema.virtual("imageUrl").get(function () {
    if (this.image) {
        const baseUrl = process.env.WEBSITES_LINK;
        return `${baseUrl}/categories/${this.image}`;
    }
    return null;
});


// Indexes
brandSchema.index({ name: 1, slug: 1 });


module.exports = mongoose.model("Brand", brandSchema);
