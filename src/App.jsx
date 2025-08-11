import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./pages/Home";
import List from "./pages/ListAndEdit";
import Create from "./pages/Create";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      {/* my logo and navbar */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
