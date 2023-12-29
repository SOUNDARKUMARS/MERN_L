import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

const Showbook = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      axios.get(`http://localhost:5555/books/${_id}`).then((res) => {
        console.log(res.data);
        setBook(res.data);
      });
      setLoading(false);
    } catch (error) {
      console.log("error in fetching a book data", error);
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-left">
        <Typography variant="h1">{book.title}</Typography>
        <p>
          <span className="font-semibold">ID:</span> {book?._id}
        </p>
        <p>
          <span className="font-semibold">Author:</span> {book?.author}
        </p>
        <p>
          <span className="font-semibold">Published Year:</span>{" "}
          {book?.publishedYear}
        </p>
        <p>
          <span className="font-semibold">Created at:</span>{" "}
          {moment(book?.updatedAt).format("DD/MM/YYYY")}
        </p>
        <p>
          <span className="font-semibold">Updated at:</span>{" "}
          {moment(book?.updatedAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default Showbook;
