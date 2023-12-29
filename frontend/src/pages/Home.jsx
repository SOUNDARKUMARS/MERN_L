import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
      })
      .catch((err) => {
        console.log("err in fetching books", err);
      });
  }, []);
  console.log("book[1] id", books[1]?._id);
  return (
    <div>
      <div className="mt-10 font-bold ">
        <div className="flex justify-around items-center font-bold text-2xl mb-6">
          <p>Book Store</p>
          <Button variant="contained">
            <Link to="/create-book">Add</Link>
          </Button>
        </div>
        <TableContainer
          style={{ margin: "auto", width: "80%" }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "black" }}>
                <TableCell sx={{ color: "white" }}>No</TableCell>
                <TableCell sx={{ color: "white" }}>Title</TableCell>
                <TableCell sx={{ color: "white" }}>Author</TableCell>
                <TableCell sx={{ color: "white" }}>Published Year</TableCell>
                <TableCell sx={{ color: "white" }}>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {book.title}
                    {`- ${book.price ? book.price : ""}`}
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>
                    <div className="flex gap-x-4">
                      <Link to={`/show-book/${book._id}`}>info </Link>
                      <Link to={`/edit-book/${book._id}`}>edit</Link>
                      <Link to={`/delete-book/${book._id}`}>delete</Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
