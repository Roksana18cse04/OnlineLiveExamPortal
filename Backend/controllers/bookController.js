const firestore = require('../config/firebaseConfig'); // Make sure to initialize Firebase correctly

// Function to fetch books from Firestore
const getBooksFromDB = async () => {
  try {
    // Query the Firestore collection
    const snapshot = await firestore.collection('books').get();
    const books = snapshot.docs.map(doc => doc.data()); // Convert Firestore docs to a plain array of book objects
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error('Error fetching books from DB');
  }
};

// Handler to get all books
const getBooks = async (req, res) => {
  try {
    const books = await getBooksFromDB(); // Fetch books from the database
    res.status(200).json(books); // Send books data as a response
  } catch (error) {
    console.error("Error in /api/books route:", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getBooksFromDB,
  getBooks,
};
