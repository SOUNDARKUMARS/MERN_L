import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Createbook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [Price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    try {
      const data = {
        title,
        author,
        publishedYear,
        Price,
      };
      setLoading(true);
      axios
        .post("http://localhost:5555/books", data)
        .then(setLoading(false))
        .then(navigate("/"))
        .catch((err) => {
          alert("error in creating new book");
          console.log("err in creating new book", err);
          setLoading(false);
        });
    } catch (error) {
      console.log("error in submitting the form", error);
      setLoading(false);
    }
  };
  return (
    <div className="border flex  justify-center items-center h-screen flex-col">
      <div>
        {loading ? (
          <div>
            <p className="text-xl font-bold">loading....</p>
          </div>
        ) : (
          <div>
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
            <div>
              <h1>Price:</h1>
              <input
                className="border border-black p-1 my-1"
                type="number"
                value={Price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <Button onClick={handleSubmit} variant="contained">
              Create Book
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Createbook;
