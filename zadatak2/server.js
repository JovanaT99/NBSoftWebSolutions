const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Uvoz cors middleware
const app = express();
const port = 3001;

// Postavljanje body-parser middleware-a za obradu JSON podataka
app.use(bodyParser.json());

// Postavljanje body-parser middleware-a za obradu URL-encoded podataka
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Definisanje endpoint-a
app.get("/form", (req, res) => {
  res.send("Odgovor sa servera");
});

app.post("/form", (req, res) => {
  // obraditi podatke iz forme i vratiti odgovor
  const formData = req.body; // Podaci iz forme su u req.body objektu

  const responseData = {
    message: "Uspešno ste popunili formu.",
    formData: formData, // Ovo su podaci  sa forme
  };

  res.json(responseData);
});

app.listen(port, () => {
  console.log(`Server radi na http://localhost:${port}`);
});
