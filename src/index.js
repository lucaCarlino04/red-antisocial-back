const express = require("express");

const conectarDB = require("./db/mongodb");

const app = express();

conectarDB();

app.use(express.json());

app.get("/")
  
