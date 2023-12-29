import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "all the fields are required: title,author,publishedYear",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(201).json({ message: "book updated" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).json({ message: "book deleted" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "all the fields are required: title,author,publishedYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
      price: req.body.Price,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
