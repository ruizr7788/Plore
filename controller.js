import "core-js/stable";
import "regenerator-runtime/runtime";

import serviceSectionView from "./Views/serviceSectionView.js";
import navbarView from "./Views/navbarView.js";
import weatherBarView from "./Views/weatherBarView.js";
import * as model from "./model.js";

const sectionController = function (entry, observer) {
  // once section container is 10% in view render section
  model.sectionFadeIn(entry, observer);
};

const navbarController = function (entry, observer) {
  // make navbar sticky on home page is not visible
  model.stickyNavbar(entry, observer);
};

const weatherController = async function (query) {
  try {
    await model.setState(query);

    // render data
    weatherBarView.renderWeather(model.state);
  } catch (err) {
    weatherBarView.renderError();
  }
};

const init = function () {
  serviceSectionView.addHandlerRender(sectionController);
  navbarView.addHandlerRender(navbarController);
  weatherBarView.addHandlerRender(weatherController);
};
init();
