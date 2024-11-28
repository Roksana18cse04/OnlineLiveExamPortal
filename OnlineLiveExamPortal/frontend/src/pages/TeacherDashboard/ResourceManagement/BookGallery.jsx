import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookGallery = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBook, setNewBook] = useState({
    title: "",
    coverImage: null,
    pdfFile: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/books");
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredBooks = Array.isArray(books)
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm)
      )
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "coverImage") {
      setNewBook({ ...newBook, coverImage: files[0] });
    } else if (name === "pdfFile") {
      setNewBook({ ...newBook, pdfFile: files[0] });
    }
  };

  const handleAddBook = async (newBookData) => {
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookData), // Make sure this is formatted correctly
      });
  
      if (!response.ok) {
        throw new Error('Failed to add the book');
      }
  
      const data = await response.json();
      console.log('Book added:', data);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  

  const openPdf = (pdfUrl) => window.open(pdfUrl, "_blank");

  const handleDeleteBook = async (id, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the book.");
      }
      setBooks(books.filter((book) => book.id !== id));
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete the book.");
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Book Gallery</h1>
        <input
          type="text"
          placeholder="Search books..."
          className="form-control w-25"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading books...</p>
      ) : (
        <div className="row">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div className="col-md-3 mb-4" key={book.id}>
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => openPdf(book.pdfUrl)}
                >
                  <img
                    src={book.coverImage}
                    className="card-img-top"
                    alt={book.title}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{book.title}</h5>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDeleteBook(book.id, e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No books found.</p>
          )}
        </div>
      )}

      <div className="mt-5">
        <h2>Upload a New Book</h2>
        <form onSubmit={handleAddBook}>
          <div className="form-group mb-3">
            <label>Book Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={newBook.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Cover Image</label>
            <input
              type="file"
              name="coverImage"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>PDF File</label>
            <input
              type="file"
              name="pdfFile"
              className="form-control"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Upload Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookGallery;