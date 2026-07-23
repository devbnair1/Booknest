const express = require("express");
const router = express.Router();

const {
    buyBook,
    getUserPurchases,
    getAllPurchases,
} = require("../controllers/purchaseController");

// Buy Book
router.post("/buy", buyBook);

// Get All Purchases (Admin)
router.get("/all", getAllPurchases);

// Get Purchases of One User
router.get("/:username", getUserPurchases);

module.exports = router;