import express from "express";
import User from "../Schema/userSchema.js";
import { authenticateToken } from "../validator/tokenValidation.js";

const favRouter = express.Router();

// Add a favorite item to a user's profile
favRouter.put("/mark-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const isBookfavorite = userData.favourites.includes(bookid);
    if (isBookfavorite) {
      return res
        .status(200)
        .json({ message: "Book already added to favorites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book is added to favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//remove the book from favorites
favRouter.put(
  "/remove-favourite-books",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);
      const isBookfavorite = userData.favourites.includes(bookid);
      if (isBookfavorite) {
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
      }
      return res.status(200).json({ message: "Book removed from favorites", });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

//get all favorites books of a specific user
favRouter.get("/get-all-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favoriteBooks = userData.favourites;
    return res.status(200).json({ data: favoriteBooks, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default favRouter;
