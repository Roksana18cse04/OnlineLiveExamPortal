import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const BookUploadForm = () => {
  const [bookName, setBookName] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage
    if (image) {
      const imageRef = firebase.storage().ref(`book_images/${image.name}`);
      await imageRef.put(image);
      const imageUrl = await imageRef.getDownloadURL();

      // Add book data to Firestore
      await firebase.firestore().collection("books").add({
        name: bookName,
        image_url: imageUrl,
        pdf_url: pdfUrl,
      });

      setBookName("");
      setPdfUrl("");
      setImage(null);
      setImageUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />
      <input
        type="url"
        placeholder="PDF URL"
        value={pdfUrl}
        onChange={(e) => setPdfUrl(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookUploadForm;
