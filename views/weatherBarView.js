import { mark } from "regenerator-runtime";
import View from "./view.js";

class WeatherView extends View {
  #data;
  #parentElement = document.querySelector(".weather-strip");
  #weatherInput = document.getElementById("weather_search");

  addHandlerRender(handler) {
    const form = document.querySelector(".form--weather-search");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderSpinner(this.#parentElement);
      //   input
      const query = this.#weatherInput.value;
      handler(query);
    });
  }

  renderWeather(data) {
    this.#data = data;
    console.log(this.#data);
    const markup = this.generateMarkup();
    this._clear();
    this.#parentElement.insertAdjacentHTML(
      "beforeend",
      `<p class="location-label">Showing results for ${
        this.#data.location.name
      }, ${this.#data.location.region}</p>`
    );
    this.#parentElement.insertAdjacentHTML("beforeend", markup);
  }

  generateMarkup() {
    const data = this.#data.weather;
    const html = data
      .map((day) => {
        return `
        <div class="weathercard">
              <h2 id="${day.weekday}" class="weekday">${day.weekday}</h2>
            <div class="weather-info">
                <h3 id="deg">${day.day.avgtemp_f}</h3>
                <div class="img_des">
                  <img id="img" src="${day.day.condition.icon}" alt="..." />
                  <p id="des">${day.day.condition.text}</p>
                </div>

                <p class="weather-range">
                  <span id="high_temp">H: ${day.day.maxtemp_f}</span><br /><span id="low_temp"
                    >L: ${day.day.mintemp_f}</span
                  >
                </p>
            </div>
        </div>
        
        `;
      })
      .join("");
    return html;
  }

  renderError() {
    const html = `
    <div id="error__message_search">
        <p>No search found</p>
    </div> 
    `;
    this._clear();
    this.#parentElement.insertAdjacentHTML("beforeend", html);
  }

  _clear() {
    this.#parentElement.innerHTML = "";
    this.#weatherInput.blur();
  }
}

export default new WeatherView();
