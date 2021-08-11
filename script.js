// start by fetchin data i need
fetch(
  "https://api.edamam.com/api/recipes/v2?type=public&cuisineType=italian&app_id=fb075c41&app_key=1916b0e913f376b4311b0b2c82a39941",
  {
    method: "GET",
    credentials: "same-origin",
    redirect: "follow",
    cache: "no-store",
  }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("Italian foods");
    console.log(data);
  });
