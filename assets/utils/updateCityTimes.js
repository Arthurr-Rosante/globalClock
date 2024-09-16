import getLocalTime from "./getLocalTime.js";
import { list } from "../../index.js";

function updateCityTimes() {
  const cities = document.querySelectorAll("#list li");

  cities.forEach((cityEl) => {
    const name = cityEl.querySelector(".name").textContent;
    const timezone = cityEl.querySelector(".timer").dataset.timezone;

    const city = list.find(
      (cty) => cty.name === name && cty.timezone == timezone
    );

    if (city) {
      const currentTime = getLocalTime(city.timezone);
      cityEl.querySelector(".timer").textContent = currentTime;
    }
  });
}

function syncWithMinutes() {
  const now = new Date();
  const secondsUntilNextMinute = 60 - now.getSeconds();

  setTimeout(() => {
    updateCityTimes();
    setInterval(updateCityTimes, 60000);
  }, secondsUntilNextMinute * 1000);
}

export { updateCityTimes, syncWithMinutes };
