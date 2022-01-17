// --------- Transition service cards into view ----------
const serviceCards = document.getElementById("services");

const serviceFadeIn = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section_translate-left");
  observer.unobserve(entry.target);
};

const serviceCardObserver = new IntersectionObserver(serviceFadeIn, {
  root: null,
  threshold: 0.1,
});
serviceCardObserver.observe(serviceCards);

// ---------- Weather API ----------

// selecting degree html elements
const monDegEl = document.getElementById("monday_deg");
const tueDegEl = document.getElementById("tuesday_deg");
const wedDegEl = document.getElementById("wednesday_deg");
const thuDegEl = document.getElementById("thursday_deg");
const friDegEl = document.getElementById("friday_deg");
const satDegEl = document.getElementById("saturday_deg");
const sunDegEl = document.getElementById("sunday_deg");

// selecting highs and lows html elements
const monHighEl = document.getElementById("mon_high_temp");
const tueHighEl = document.getElementById("tue_high_temp");
const wedHighEl = document.getElementById("wed_high_temp");
const thuHighEl = document.getElementById("thu_high_temp");
const friHighEl = document.getElementById("fri_high_temp");
const satHighEl = document.getElementById("sat_high_temp");
const sunHighEl = document.getElementById("sun_high_temp");
const monLowEl = document.getElementById("mon_low_temp");
const tueLowEl = document.getElementById("tue_low_temp");
const wedLowEl = document.getElementById("wed_low_temp");
const thuLowEl = document.getElementById("thu_low_temp");
const friLowEl = document.getElementById("fri_low_temp");
const satLowEl = document.getElementById("sat_low_temp");
const sunLowEl = document.getElementById("sun_low_temp");

// Selecting elements for image setting and description ----------

const monImgEl = document.getElementById("mon_img");
const tueImgEl = document.getElementById("tue_img");
const wedImgEl = document.getElementById("wed_img");
const thuImgEl = document.getElementById("thu_img");
const friImgEl = document.getElementById("fri_img");
const satImgEl = document.getElementById("sat_img");
const sunImgEl = document.getElementById("sun_img");

const monDesEl = document.getElementById("mon_des");
const tueDesEl = document.getElementById("tue_des");
const wedDesEl = document.getElementById("wed_des");
const thuDesEl = document.getElementById("thu_des");
const friDesEl = document.getElementById("fri_des");
const satDesEl = document.getElementById("sat_des");
const sunDesEl = document.getElementById("sun_des");

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status})`);

    return response.json();
  });
};

const getUserLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (err) => reject(err)
    );
  });
};

const getWeather = async function () {
  const currentTime = Date.now();
  const coords = await getUserLocation();

  return new Promise((resolve, reject) => {
    if (!coords) reject(new Error("no coordinates"));
    resolve(
      getJSON(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&exclude=minutely,hourly&appid=c957bb35023d776de66cd9033a121dcd
      `)
    );
  });
};

const setData = async function () {
  const data = await getWeather();
  document.getElementById("weather_container").style.opacity = 1;
  console.log(data);

  // ------ setting main temps ------
  sunDegEl.textContent = `${data.daily[0].feels_like.day}°`;
  monDegEl.textContent = `${data.daily[1].feels_like.day}°`;
  tueDegEl.textContent = `${data.daily[2].feels_like.day}°`;
  wedDegEl.textContent = `${data.daily[3].feels_like.day}°`;
  thuDegEl.textContent = `${data.daily[4].feels_like.day}°`;
  friDegEl.textContent = `${data.daily[5].feels_like.day}°`;
  satDegEl.textContent = `${data.daily[6].feels_like.day}°`;

  // ------ Setting mins and maxs ------
  // use dayWeather.temp.min or .max for low and high temps
  // sunday
  sunHighEl.textContent = `H:${data.daily[0].temp.max}`;
  sunLowEl.textContent = `L:${data.daily[0].temp.min}`;

  // monday
  monHighEl.textContent = `H:${data.daily[1].temp.max}`;
  monLowEl.textContent = `L:${data.daily[1].temp.min}`;

  // tuesday
  tueHighEl.textContent = `H:${data.daily[2].temp.max}`;
  tueLowEl.textContent = `L:${data.daily[2].temp.min}`;

  // wednesday
  wedHighEl.textContent = `H:${data.daily[3].temp.max}`;
  wedHighEl.textContent = `L:${data.daily[3].temp.min}`;

  // thursday
  thuHighEl.textContent = `H:${data.daily[4].temp.max}`;
  thuLowEl.textContent = `L:${data.daily[4].temp.min}`;

  // friday
  friHighEl.textContent = `H:${data.daily[5].temp.max}`;
  friLowEl.textContent = `L:${data.daily[5].temp.min}`;

  // saturday
  satHighEl.textContent = `H:${data.daily[6].temp.max}`;
  satLowEl.textContent = `L:${data.daily[6].temp.min}`;

  // Setting images -----------------
  // http://openweathermap.org/img/wn/10d@2x.png
  // use dayWEather.weather[0].main to determin adjective
  // use dayWEather.weather[0].icon to determine icon used
  sunImgEl.src = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;

  monImgEl.src = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`;

  tueImgEl.src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`;

  wedImgEl.src = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`;

  thuImgEl.src = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`;

  friImgEl.src = `http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`;

  satImgEl.src = `http://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}@2x.png`;

  // setting descriptions ------------------------------------------
  sunDesEl.textContent = data.daily[0].weather[0].description;
  monDesEl.textContent = data.daily[1].weather[0].description;
  tueDesEl.textContent = data.daily[2].weather[0].description;
  wedDesEl.textContent = data.daily[3].weather[0].description;
  thuDesEl.textContent = data.daily[4].weather[0].description;
  friDesEl.textContent = data.daily[5].weather[0].description;
  satDesEl.textContent = data.daily[6].weather[0].description;
};

setData();
