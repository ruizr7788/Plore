import "regenerator-runtime/runtime";

export const state = {
  // inside weather store all informatino we need to display
  weather: [],
  location: {},
};

// --------- Transition service cards into view ----------
export const sectionFadeIn = function (entry, observer) {
  if (!entry[0].isIntersecting) return;
  entry[0].target.classList.remove("hidden");
  observer.unobserve(entry[0].target);
};

// fixed navbar --------------------------------------

export const stickyNavbar = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting === false) navbar.classList.add("fixed");
  else navbar.classList.remove("fixed");
};

// ---------- Weather ----------

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status})`);
    return response.json();
  });
};

export const setState = async function (query) {
  try {
    state.weather = [];
    // get weather using the search query
    const data = await getJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=29e0186ae9ac4bc18c444525220402&q=${query}&days=7`
    );

    state.location.name = data.location.name;
    state.location.region = data.location.region;
    state.weather.push(...data.forecast.forecastday);

    state.weather.forEach((day) => {
      const date = new Date(day.date);
      const weekday = date.getDate();
      switch (weekday) {
        case 5:
          day.weekday = "Sunday";
          break;
        case 6:
          day.weekday = "Monday";
          break;
        case 0:
          day.weekday = "Tuesday";
          break;
        case 1:
          day.weekday = "Wednesday";
          break;
        case 2:
          day.weekday = "Thursday";
          break;
        case 3:
          day.weekday = "Friday";
          break;
        case 4:
          day.weekday = "Saturday";
          break;
      }
    });

    console.log(state.weather);
  } catch (err) {
    throw err;
  }
};
