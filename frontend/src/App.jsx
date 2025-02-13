import { useState } from 'react'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Feed from './Components/feed'
import AddPost from './Components/AddPost'


function App() {


  return (
    <>
   <Router>
   <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/feed' element={<Feed/>}/>
    <Route path='/add-post' element={<AddPost/>}/>


   </Routes>
  </Router>
    </>
  )
}

export default App
