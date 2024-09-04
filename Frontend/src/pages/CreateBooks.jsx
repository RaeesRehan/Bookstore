import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState(0); 
  const [genre, setGenre] = useState('');
  const [copies, setCopies] = useState(0);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image1') setImage1(files[0]);
    if (name === 'image2') setImage2(files[0]);
    if (name === 'pdf') setPdf(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

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
      const response = await axios.post('http://localhost:5555/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Book submission successful, status: ' + response.status);

      setTitle('');
      setAuthor('');
      setPublicationYear(0);
      setGenre('');
      setCopies(0);
      setImage1(null);
      setImage2(null);
      setPdf(null);
    } catch (error) {
      console.error('There was an error submitting the book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="number" placeholder="Publication Year" value={publicationYear} onChange={(e) => setPublicationYear(Number(e.target.value))} required />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input type="number" placeholder="Copies" value={copies} onChange={(e) => setCopies(Number(e.target.value))} />
      <input type="file" name="image1" onChange={handleFileChange} />
      <input type="file" name="image2" onChange={handleFileChange} />
      <input type="file" name="pdf" onChange={handleFileChange} />
      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="submit">Upload Book</button>
      <Link to={`/`}>
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="button">Home</button>
      </Link>
    </form>
  );
};

export default CreateBooks;
