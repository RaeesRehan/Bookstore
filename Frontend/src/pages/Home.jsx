import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader.jsx'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/books')
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
 <Splide 
      options={{
        type: 'loop',
        perMove: 1,
        autoplay: true,
        interval: 3000,
        pauseOnHover: false,
        gap: '1rem',
      }} 
      aria-label="My Favorite Images"
      className="relative h-[50vh]"
    >
      <SplideSlide >
        <div style={{ backgroundImage: `url(${img1})` }} className="h-[50vh] w-full  bg-cover bg-center">
        </div>
      </SplideSlide>
      <SplideSlide >
        <div style={{ backgroundImage: `url(${img2})` }} className="h-[50vh] w-full bg-cover bg-center">
        
        </div>
      </SplideSlide>
      <SplideSlide >
        <div style={{ backgroundImage: `url(${img3})` }} className="h-[50vh] w-full bg-cover bg-center">
       
        </div>
      </SplideSlide>

    </Splide>

    <div className="bg-themeBlue min-h-[100vh] p-4 grid place-items-center gap-4">
   
   <div className="text-white"> Create New Book 
        <Link to={`/books/create/`} >
            <button
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          type="button"
        >
          Create
        </button>
            </Link>
        </div>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-14 bg-gray-600'>
      {loading ? (
        <Loader />
      ) : (
        books.length > 0 ? (
          books.map((book, index) => (
            <div key={book._id} className="w-min bg-white p-4 rounded-lg">
              
            {book.imageUrl1 && <img src={book.imageUrl1} alt={`Cover image 1 for ${book.title}`} />}
            <p classname="font-bold" > {index + 1} : {book.title}  </p>
            <p>{book.genre}</p>
              <span className="flex justify-between">

            <Link to={`/books/delete/${book._id}`}  > <button
          class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          type="button"
        >
          Delete
        </button>
            </Link>
            <Link to={`/books/update/${book._id}`}  >  <button
          class="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-400/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          type="button"
        >
          Update
        </button>
            </Link>
            <Link to={`/books/details/${book._id}`} > <button
          class="text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          type="button"
        >
          Details
        </button>
            </Link>
            </span>

            </div>
          ))
        ) : (
          <div>No books available</div> 
        )
      )}
        </div>
    </div>
    </>

  );
};

export default Home;
