const Book = require("../models/Book");

// Get All Books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Book
const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Book
const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);

        res.json({
            message: "Book Deleted Successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
};