import { list } from "../../index.js";
import getLocalTime from "./getLocalTime.js";
import calcTimezoneDiff from "./calcTimezoneDiff.js";

//horário de Brasília como Base
const baseCityTime = getLocalTime("America/Sao_Paulo");

export default function addCityToList(city) {
  const htmlList = document.getElementById("list");

  const currentTime = getLocalTime(city.timezone);
  const timeDiff = calcTimezoneDiff(baseCityTime, currentTime);

  const listItem = document.createElement("li");
  listItem.className = "list-item";

  const h2 = document.createElement("h2");
  h2.className = "name";
  h2.textContent = city.name;

  const span = document.createElement("span");
  span.textContent = timeDiff;

  const timer = document.createElement("span");
  timer.className = "timer";
  timer.dataset.timezone = city.timezone;
  timer.textContent = getLocalTime(city.timezone);

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "deleteBtn";
  deleteBtn.addEventListener("click", () => {
    const index = list.findIndex(
      (cty) => cty.name === city.name && cty.timezone === city.timezone
    );
    if (index !== -1) {
      list.splice(index, 1);

      localStorage.setItem("listOfCities", JSON.stringify(list));
      htmlList.removeChild(listItem);
    }
  });

  const icon = document.createElement("i");
  icon.className = "fa fa-trash";
  deleteBtn.appendChild(icon);

  listItem.appendChild(h2);
  listItem.appendChild(span);
  listItem.appendChild(timer);
  listItem.appendChild(deleteBtn);

  htmlList.appendChild(listItem);
}
