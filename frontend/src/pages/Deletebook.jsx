import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Deletebook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

  const { _id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${_id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishedYear(res.data.publishedYear);
        setTitle(res.data.title);
      })
      .catch((err) => {
        console.log("err in getting book data while deleting ", err);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .delete(`http://localhost:5555/books/${_id}`)
      .then(navigate("/"))
      .catch((err) => {
        alert("error in deleting book");
        console.log("err in deleting book", err);
      });
  };
  return (
    <div className="border flex  justify-center items-center h-screen flex-col">
      <div>
        <h1>title:</h1>
        <input
          className="border border-black p-1 my-1"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <h1>author:</h1>
        <input
          className=" border border-black p-1 my-1"
          type="text"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
      </div>
      <div>
        <h1>publishedYear:</h1>
        <input
          className="border border-black p-1 my-1"
          type="number"
          value={publishedYear}
          onChange={(e) => {
            setPublishedYear(e.target.value);
          }}
        />
      </div>
      <Button onClick={handleSubmit} variant="contained">
        delete
      </Button>
    </div>
  );
};

export default Deletebook;
