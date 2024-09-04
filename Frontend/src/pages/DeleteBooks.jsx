import React, {useState, useEffect} from 'react'
import Loader from '../components/Loader.jsx'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const DeleteBooks = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
     .then((res) => {
      setLoading(true) 
      setTitle(res.data.title)
       setLoading(false)
      }) .catch((err) => {console.log(err)})
  
  }, [title])
  


  const handleDelete = () => {
    axios.delete(`http://localhost:5555/books/${id}`)
     .then(() => {
       setLoading(false)
        navigate('/')
      })
     .catch((error) => {
       setLoading(false)
        console.log(error)
      })
  }
  return (
    <>
    <div>Delete Book:  '' {title}''</div>
    {loading?(
      <Loader />
    ) : (
      <button onClick={handleDelete}>Delete Book</button>
    )}
    </>
  )
}

export default DeleteBooks