import * as THREE from "three";
import { addDot } from "./addDot.js";

export default async function drawCities() {
  try {
    const res = await fetch("../cities.json");
    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const cities = await res.json();
    cities.forEach((city) => {
      const color = new THREE.Color(0, Math.random(), Math.random());
      addDot(city.latitude, city.longitude, color);
    });
  } catch (error) {
    console.error(error.message);
  }
}
