import express from "express";
import User from "../Schema/userSchema.js";
import { authenticateToken } from "../validator/tokenValidation.js";
import Book from "../Schema/bookSchema.js";
import Order from "../Schema/orderSchema.js";
import mongoose from "mongoose";

const bookRouter = express.Router();

//only admin can perform
//add books api
bookRouter.post("/addbook", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden. Only admin can add books" });
    }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      language: req.body.language,
    });

    await book.save();

    res.status(201).json({ message: "Book added successfully", data: book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update book api
bookRouter.put("/updatebook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      language: req.body.language,
    });
    return res.status(200).json({
      message: "Book updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete book api
bookRouter.delete("/deletebook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.body;

    // Validate bookid
    if (!bookid || !mongoose.Types.ObjectId.isValid(bookid)) {
      return res.status(400).json({ message: "Valid Book ID is required" });
    }

    // Deleting the book by its ID
    const deletedBook = await Book.findByIdAndDelete(bookid);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Deleting related orders for the deleted book
    const deleteOrders = await Order.deleteMany({ book: bookid });

    return res.status(200).json({
      message: "Book and related orders deleted successfully",
      deletedOrdersCount: deleteOrders.deletedCount,
    });
  } catch (err) {
    console.error("Error deleting book and related orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



//normal user can perform
//get all books api
bookRouter.get("/getallbooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: books, status: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get recently added books
bookRouter.get("/getrecentbooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ data: books, status: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get book by id
bookRouter.get("/getbookbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ data: book, status: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default bookRouter;
