// --------- Transition service cards into view ----------
const serviceContainer = document.querySelector(".section");

const sectionFadeIn = function (entry, observer) {
  if (!entry[0].isIntersecting) return;
  entry[0].target.classList.remove("hidden");
  observer.unobserve(entry[0].target);
};

const serviceObserver = new IntersectionObserver(sectionFadeIn, {
  root: null,
  threshold: 0.1,
});
serviceObserver.observe(serviceContainer);

// fixed navbar --------------------------------------
const navbar = document.getElementById("navbar");
const lanPage = document.getElementById("home");
const navHeight = navbar.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting === false) navbar.classList.add("fixed");
  else navbar.classList.remove("fixed");
};

const lanPageObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
lanPageObserver.observe(lanPage);

// ---------- Weather API ----------

// selecting degree html elements

const sunDegEl = document.getElementById("sunday_deg");

// selecting highs and lows html elements
const sunHighEl = document.getElementById("sun_high_temp");

const sunLowEl = document.getElementById("sun_low_temp");

// Selecting elements for image setting and description ----------

const sunImgEl = document.getElementById("sun_img");

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
  console.log(data);
  document.getElementById("weather_container").style.opacity = 1;
  console.log(data);

  // ------ setting main temps ------
  sunDegEl.textContent = `${data.daily[0].feels_like.day}°`;

  // ------ Setting mins and maxs ------
  // use dayWeather.temp.min or .max for low and high temps
  // sunday
  sunHighEl.textContent = `H:${data.daily[0].temp.max}`;
  sunLowEl.textContent = `L:${data.daily[0].temp.min}`;

  // Setting images -----------------
  // http://openweathermap.org/img/wn/10d@2x.png
  // use dayWEather.weather[0].main to determin adjective
  // use dayWEather.weather[0].icon to determine icon used
  sunImgEl.src = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;

  // setting descriptions ------------------------------------------
  sunDesEl.textContent = data.daily[0].weather[0].description;
};

// setData();
