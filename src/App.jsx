import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import History from './pages/History'
import Committee from './pages/Committee'
import About from './pages/About'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}