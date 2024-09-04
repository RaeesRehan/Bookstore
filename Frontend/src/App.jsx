import {Route, Routes} from 'react-router-dom'
import CreateBooks from './pages/CreateBooks.jsx'
import Home        from './pages/Home.jsx'
import DeleteBooks from './pages/DeleteBooks.jsx'
import BookDetails from './pages/BookDetails.jsx'
import UpdateBooks from './pages/UpdateBooks.jsx'

function App() {

  return (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/books/create' element={<CreateBooks />} />
    <Route path='/books/delete/:id' element={<DeleteBooks />} />
    <Route path='/books/details/:id' element={<BookDetails />} />
    <Route path='/books/update/:id' element={<UpdateBooks />} />
    </Routes>
  )
}

export default App
