import { addDot } from "./addDot.js";

export default async function drawCities() {
  try {
    const res = await fetch("../cities.json");
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const cities = await res.json();
    cities.forEach((city) => {
      const color = 0xffffff;
      addDot(city, color);
    });
  } catch (error) {
    console.error(error.message);
  }
}
