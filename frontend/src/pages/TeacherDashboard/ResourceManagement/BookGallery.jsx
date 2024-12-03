import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase"; // Import Firestore and Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import ref, uploadBytes, getDownloadURL

const BookGallery = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBook, setNewBook] = useState({
    title: "",
    coverImage: "",
    pdfUrl: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const booksCollectionRef = collection(db, "books");
      const booksSnapshot = await getDocs(booksCollectionRef);
      const booksData = booksSnapshot.docs.map((doc) => doc.data());
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

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.coverImage || !newBook.pdfUrl) {
      toast.error("Both cover image URL and PDF URL are required.");
      return;
    }

    try {
      // Store book metadata in Firestore
      const newBookData = {
        title: newBook.title,
        coverImage: newBook.coverImage,
        pdfUrl: newBook.pdfUrl,
      };

      const docRef = await addDoc(collection(db, "books"), newBookData);
      console.log("Book added with ID: ", docRef.id);
      fetchBooks(); // Refresh the book list
      setNewBook({ title: "", coverImage: "", pdfUrl: "" }); // Reset the form
      toast.success("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to upload the book.");
    }
  };

  const openPdf = (pdfUrl) => window.open(pdfUrl, "_blank");

  const handleDeleteBook = async (id, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      // Delete book from Firestore
      const bookDocRef = doc(db, "books", id);
      await deleteDoc(bookDocRef);
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
            <label>Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              className="form-control"
              value={newBook.coverImage}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </div>
          <div className="form-group mb-3">
            <label>PDF URL</label>
            <input
              type="text"
              name="pdfUrl"
              className="form-control"
              value={newBook.pdfUrl}
              onChange={handleInputChange}
              placeholder="Enter PDF URL"
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
