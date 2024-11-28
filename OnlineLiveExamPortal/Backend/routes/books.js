const express = require("express");
const router = express.Router();

let books = [
  { id: 1, title: "Book One", coverImage: "https://via.placeholder.com/150", pdfUrl: "#" },
  { id: 2, title: "Book Two", coverImage: "https://via.placeholder.com/150", pdfUrl: "#" },
];

// Get all books
router.get("/", (req,res) => {
  res.json(books);
});

// Add a new book
router.post("/", (req, res) => {
  const newBook = { ...req.body, id: books.length + 1 };
  books.push(newBook);
  res.json(newBook);
});

// Delete a book by ID
router.delete("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((book) => book.id !== bookId);
  res.json({ message: "Book deleted" });
});

module.exports = router;
