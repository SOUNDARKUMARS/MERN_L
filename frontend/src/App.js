import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { Createbook, Deletebook, Editbook, Home, Showbook } from "./pages";

const App = () => {
  useEffect(() => {
    axios.get("http://localhost:5555/books").then((res) => {
      console.log(res.data.data);
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/create-book" element={<Createbook />} />
        <Route path="/delete-book/:_id" element={<Deletebook />} />
        <Route path="/edit-book/:_id" element={<Editbook />} />
        <Route path="/" element={<Home />} />
        <Route path="/show-book/:_id" element={<Showbook />} />
      </Routes>
    </div>
  );
};

export default App;
