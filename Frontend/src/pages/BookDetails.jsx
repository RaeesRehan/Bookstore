import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        console.log(res.data)
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch book details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  {   console.log(book.imageUrl1, book.imageUrl2, book.pdfUrl);}
  return (
    <div className="p-4 grid place-items-center gap-4 text-white">
      <h1>Book Details</h1>
      <h3>{book._id}</h3>
      <h3>{book.title}</h3>
      <h3>{book.author}</h3>
      <p>Genre: {book.genre}</p>
      <p>Copies: {book.copies}</p>
      {book.imageUrl1 && <img src={book.imageUrl1} alt={`Cover image 1 for ${book.title}`} />}
      {book.imageUrl2 && <img src={book.imageUrl2} alt={`Cover image 2 for ${book.title}`} />}
      {book.pdfUrl && <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>}
      <p>Created At: {book.createdAt }</p>
      <p>Updated At: {book.updatedAt }</p>
    </div>
  );
}

export default BookDetails;
