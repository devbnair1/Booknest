const express = require("express");
const router = express.Router();

const {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");

// GET All Books
router.get("/", getBooks);

// POST Add Book
router.post("/", addBook);

// PUT Update Book
router.put("/:id", updateBook);

// DELETE Book
router.delete("/:id", deleteBook);

module.exports = router;