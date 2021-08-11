//seting vars
var textBox = $(".daCity");
var btnArea = $(".prevCities");
var dayBox = $(".dayBox");
var weekBoxes = [
  $("#weekDay1"),
  $("#weekDay2"),
  $("#weekDay3"),
  $("#weekDay4"),
  $("#weekDay5"),
];
var cityBtn = document.querySelector(".submitBtn");
cityBtn.addEventListener("click", getCity);
var cityOldBtn;
var currentCity;
var currentCityInfo;

// just to get the date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
today = mm + "/" + dd + "/" + yyyy;

// gets the city by name
function getCity() {
  var input = textBox.val();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&units=imperial&appid=bdf9878507551e1cf1dad292997418ad",
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
      console.log(input + " city");
      currentCity = data;
      console.log(currentCity);
      getCityInfo();
    });
}

// gets the city by lat and lon
function getCityInfo() {
  var lat = currentCity.coord.lat;
  var lon = currentCity.coord.lon;
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=bdf9878507551e1cf1dad292997418ad",
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
      console.log("city info");
      currentCityInfo = data;
      console.log(data);
      setInfo();
    });
}

//sets the infor for the day in the daybox
function setInfo() {
  $(dayBox).children().remove().end();
  dayBox.append(
    "<p class='big'>" +
      currentCity.name +
      " ( " +
      today +
      " )</p><img src='http://openweathermap.org/img/w/" +
      currentCity.weather[0].icon +
      ".png' alt='Weather icon'><br>"
  );
  dayBox.append("<p>temp: " + currentCity.main.temp + "</p>");
  dayBox.append("<br>");
  dayBox.append("<p>wind: " + currentCity.wind.speed + "</p>");
  dayBox.append("<br>");
  dayBox.append("<p>humidity:" + currentCity.main.humidity + "</p>");
  dayBox.append("<br>");
  if (currentCityInfo.current.uvi > 8) {
    dayBox.append(
      "<p>UV Index: <span class='high'>" +
        currentCityInfo.current.uvi +
        "</span></p>"
    );
    dayBox.append("<br>");
  } else if (
    currentCityInfo.current.uvi < 8 &&
    currentCityInfo.current.uvi > 3
  ) {
    dayBox.append(
      "<p>UV Index: <span class='med'>" +
        currentCityInfo.current.uvi +
        "</span></p>"
    );
    dayBox.append("<br>");
  } else {
    dayBox.append(
      "<p>UV Index: <span class='low'>" +
        currentCityInfo.current.uvi +
        "</span></p>"
    );
    dayBox.append("<br>");
  }
  setDayByDay();
}

// sets the weekly info
function setDayByDay() {
  for (i = 1; i < 6; i++) {
    var advDate = "( " + mm + "/" + (dd + i) + "/" + yyyy + " )";
    $(weekBoxes[i - 1])
      .children()
      .remove()
      .end();

    weekBoxes[i - 1].append(
      "<p class='bold'>" +
        currentCity.name +
        advDate +
        "</p><img src='http://openweathermap.org/img/w/" +
        currentCityInfo.daily[i].weather[0].icon +
        ".png' alt='Weather icon'><br>"
    );
    weekBoxes[i - 1].append(
      "<p>temp: " + currentCityInfo.daily[i].temp.day + "</p>"
    );
    weekBoxes[i - 1].append("<br>");
    weekBoxes[i - 1].append(
      "<p>wind: " + currentCityInfo.daily[i].wind_speed + "</p>"
    );
    weekBoxes[i - 1].append("<br>");
    weekBoxes[i - 1].append(
      "<p>humidity:" + currentCityInfo.daily[i].humidity + "</p>"
    );
    weekBoxes[i - 1].append("<br>");
  }
  saveCity();
}

function saveCity() {
  btnArea.append(
    "<button class='btn btn-outline-secondary submitOldBtn' type='button'>" +
      currentCity.name +
      "</button>"
  );
  cityOldBtn = document.querySelector(".submitOldBtn");
  cityOldBtn.addEventListener("click", getOldCity);
}

// gets the city by name (same as above but the input is different)
function getOldCity(event) {
  var input = event.toElement.textContent;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&units=imperial&appid=bdf9878507551e1cf1dad292997418ad",
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
      console.log(input + " city");
      currentCity = data;
      console.log(currentCity);
      getCityInfo();
    });
}
