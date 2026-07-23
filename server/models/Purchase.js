const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    purchaseDate: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("Purchase", purchaseSchema);