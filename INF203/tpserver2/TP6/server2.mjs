"use strict";

import express from "express";
import morgan from "morgan";
import db from "./db.json"; 

const app = express();
const PORT = process.argv[2] || 8000;

app.use(morgan("dev")); 

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.get("/end", (req, res) => {
  res.send("Server will stop now.");
  process.exit(0);
});

app.get("/restart", (req, res) => {
  db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.send("db.json reloaded");
});

app.get("/countpapers", (req, res) => {
  res.type("text/plain");
  res.send(`${db.length}`);
});

app.get("/byauthor/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const count = db.filter((pub) =>
    pub.authors.some((a) => a.toLowerCase().includes(author))
  ).length;
  res.type("text/plain");
  res.send(`${count}`);
});

app.get("/descriptors/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const descriptors = db
    .filter((pub) =>
      pub.authors.some((a) => a.toLowerCase().includes(author))
    )
    .map((pub) => pub);
  res.json(descriptors);
});

app.get("/titlelist/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const titles = db
    .filter((pub) =>
      pub.authors.some((a) => a.toLowerCase().includes(author))
    )
    .map((pub) => pub.title);
  res.json(titles);
});

app.get("/ref/:key", (req, res) => {
  const key = req.params.key;
  const pub = db.find((item) => item.key === key);
  if (pub) {
    res.json(pub);
  } else {
    res.status(404).json({ error: "Publication not found" });
  }
});

app.delete("/ref/:key", (req, res) => {
  const key = req.params.key;
  const index = db.findIndex((item) => item.key === key);
  if (index !== -1) {
    db.splice(index, 1);
    res.json({ message: `Publication with key ${key} deleted` });
  } else {
    res.status(404).json({ error: "Publication not found" });
  }
});

app.post("/ref", express.json(), (req, res) => {
  const newPub = req.body;
  newPub.key = "imaginary"; 
  db.push(newPub);
  res.json({ message: "Publication added", key: newPub.key });
});

app.put("/ref/:key", express.json(), (req, res) => {
  const key = req.params.key;
  const index = db.findIndex((item) => item.key === key);
  if (index !== -1) {
    
    db[index] = { ...db[index], ...req.body };
    res.json({ message: `Publication with key ${key} updated` });
  } else {
    res.status(404).json({ error: "Publication not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
