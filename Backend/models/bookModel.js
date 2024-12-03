const { db, bucket } = require("../config/firebaseConfig");

// Get all books
const getBooks = async () => {
  try {
    const booksSnapshot = await db.collection("books").get();
    return booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Add a new book
const addBook = async (title, coverImageUrl, pdfUrl) => {
  try {
    const newBookRef = db.collection("books").doc();
    await newBookRef.set({ title, coverImageUrl, pdfUrl });
    return { id: newBookRef.id, title, coverImageUrl, pdfUrl };
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

// Delete a book
const deleteBook = async (id) => {
  try {
    const bookRef = db.collection("books").doc(id);
    const book = await bookRef.get();
    if (!book.exists) {
      throw new Error("Book not found");
    }

    const { coverImageUrl, pdfUrl } = book.data();

    // Delete files from storage
    await Promise.all([
      bucket.file(coverImageUrl.split('.com/')[1]).delete(),
      bucket.file(pdfUrl.split('.com/')[1]).delete(),
    ]);

    // Delete metadata from Firestore
    await bookRef.delete();
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

// Update a book
const updateBook = async (id, title, coverImageUrl, pdfUrl) => {
  try {
    const bookRef = db.collection("books").doc(id);
    const book = await bookRef.get();
    if (!book.exists) {
      throw new Error("Book not found");
    }

    // Update metadata in Firestore
    await bookRef.update({ title, coverImageUrl, pdfUrl });

    // If cover image or pdf URL has changed, delete old files and upload new ones
    if (coverImageUrl !== book.data().coverImageUrl) {
      await bucket.file(book.data().coverImageUrl.split('.com/')[1]).delete();
      await bucket.file(coverImageUrl.split('.com/')[1]).save(coverImageUrl);
    }
    if (pdfUrl !== book.data().pdfUrl) {
      await bucket.file(book.data().pdfUrl.split('.com/')[1]).delete();
      await bucket.file(pdfUrl.split('.com/')[1]).save(pdfUrl);
    }

    return { id, title, coverImageUrl, pdfUrl };
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

module.exports = { getBooks, addBook, deleteBook, updateBook };