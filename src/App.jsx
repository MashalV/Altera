import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import CreatorPage from './pages/CreatorPage'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/creator" element={<CreatorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
