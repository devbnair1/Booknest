const Purchase = require("../models/Purchase");
const Book = require("../models/Book");

// Buy Book
const buyBook = async (req, res) => {
    try {

        console.log("Request Body:", req.body);

        const { username, bookId } = req.body;

        const book = await Book.findById(bookId);

        console.log("Book Found:", book);

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        if (book.quantity <= 0) {
            return res.status(400).json({
                message: "Book is out of stock",
            });
        }

        book.quantity -= 1;
        await book.save();

        const purchase = await Purchase.create({
            username,
            bookId: book._id,
            title: book.title,
            price: book.price,
        });

        console.log("Purchase Saved:", purchase);

        res.status(201).json({
            message: "Purchase Successful",
            purchase,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message,
        });

    }
};

// Get Purchases of One User
const getUserPurchases = async (req, res) => {
    try {

        const purchases = await Purchase.find({
            username: req.params.username,
        });

        res.status(200).json(purchases);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// Get All Purchases (Admin)
const getAllPurchases = async (req, res) => {
    try {

        const purchases = await Purchase.find();

        res.status(200).json(purchases);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    buyBook,
    getUserPurchases,
    getAllPurchases,
};