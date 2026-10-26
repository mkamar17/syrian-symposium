import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import History from './pages/History'
import Committee from './pages/Committee'
import Join from './pages/Join'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/join" element={<Join />} />
      </Routes>
      <Footer />
    </>
  )
}