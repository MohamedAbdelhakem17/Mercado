const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you Must insert Category Name"],
        minLength: [3, "Category Name Must Be More Than 3 Char"],
        trim: true,
        unique:[true , "You already insert this Category "]
    } ,
    
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema)