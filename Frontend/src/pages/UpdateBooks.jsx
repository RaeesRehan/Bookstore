import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader.jsx';

const UpdateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [genre, setGenre] = useState('');
  const [copies, setCopies] = useState(0);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublicationYear(new Date(res.data.publicationYear).toISOString().split('T')[0]); // Ensure the date is in YYYY-MM-DD format
        setGenre(res.data.genre);
        setCopies(res.data.copies);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  }, [id]);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publicationYear', publicationYear);
    formData.append('genre', genre);
    formData.append('copies', copies);

    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);
    if (pdf) formData.append('pdf', pdf);

    try {
      const response = await axios.put(`http://localhost:5555/books/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Book updated successfully:', response);
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-40">
      {loading ? (
        <Loader />
      ) : (
        <>
          <label>Title</label>
          <input
            className="px-12 text-black"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Author</label>
          <input
            className="px-12 text-black"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <label>Publication Date</label>
          <input
            className="px-12 text-black"
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
          />

          <label>Genre</label>
          <input
            className="px-12 text-black"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <label>Copies</label>
          <input
            className="px-12 text-black"
            type="number"
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
          />

          <label>Image 1</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setImage1)}
          />

          <label>Image 2</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setImage2)}
          />

          <label>PDF</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setPdf)}
          />

          <button onClick={handleSubmit}>Save</button>
        </>
      )}
    </div>
  );
};

export default UpdateBooks;
