import React from "react";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import QaUrl from "./pages/qaurl/QaUrl";
import ImageSimilarity from "./pages/imageSimilarity/ImageSimilarity";
import AutoLocation from "./pages/autolocation/AutoLocation";
import GeoLocation from "./pages/geolocation/GeoLocation";



function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/image-similarity" element={<ImageSimilarity/>} />
      <Route path="/auto-lr" element={<AutoLocation/>} />
      <Route path="/geo-lt" element={<GeoLocation/>} />
      <Route path="/qaurl" element={<QaUrl/>} />
    </Routes>
  </Router>  )
}

export default App