const country = "RS";
const username = "jovana";

const url = `http://api.geonames.org/searchJSON?country=${country}&maxRows=20&username=${username}`;

$(document).ready(function () {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const cities = data.geonames.map((city) => city.name).sort();
      console.log("cities", cities);

      for (let i = 0; i < cities.length; i++) {
        $("#city").append("<option>" + cities[i] + "</option>");
      }
    })
    .catch((error) => console.error(error));
});
