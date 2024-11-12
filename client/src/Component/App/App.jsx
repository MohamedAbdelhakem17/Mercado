import Navbar from "../Navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUP from "../Register/SignUP"
function App() {



  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={""} />
          <Route path="/register" element={<SignUP />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
