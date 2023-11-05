
const country = "RS"; // Šifra za Srbiju
const username = "jovana"; // Vaš korisnički username na Geonames API

const url = `http://api.geonames.org/searchJSON?country=${country}&maxRows=20&username=${username}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const cities = data.geonames.map((city) => city.name);
    console.log(cities);
  })
  .catch((error) => console.error(error));
