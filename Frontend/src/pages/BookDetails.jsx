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
    <div className="grid p-0 h-[100vh] w-full text-black bg-cover bg-center "
    style={{
      backgroundImage: `url(${book.imageUrl1})`, 
    }}  >
      <div className="backdrop-blur-md flex items-center justify-center">
        <div className="border-white  border-2 rounded-lg bg-gray-200 bg-opacity-35 w-3/4 p-4">
      <span className="flex justify-between">

      <img src={book.imageUrl2} className="w-1/3" alt={`Cover image 2 for ${book.title}`} />

      <span>

      <h3 className="">{book._id}</h3>
      <h3>{book.title}</h3>
      <h3>{book.author}</h3>
      </span>
      </span>
      <p>Genre: {book.genre}</p>
      <p>Copies: {book.copies}</p>
      {book.pdfUrl && <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>}
      <p>Created At: {book.createdAt }</p>
     { console.log(book.createdAt)}
      <p>Updated At: {book.updatedAt }</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
