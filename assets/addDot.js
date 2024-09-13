import * as THREE from "three";
import { labels } from "../index.js";

const dotsGroup = new THREE.Group();

function addDot(city, color) {
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.009, 8, 8),
    new THREE.MeshBasicMaterial({ color })
  );

  dot.name = city.name;

  const radius = 2 + 0.001; // garante que se mantenha acima da superfície
  const phi = THREE.MathUtils.degToRad(90 - city.latitude);
  const theta = THREE.MathUtils.degToRad(city.longitude * -1);

  dot.position.set(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
  dotsGroup.add(dot);

  const label = document.createElement("div");
  label.className = "city-label";
  label.textContent = `${city.name} | ${city.originCountry}`;
  label.style.display = "none";
  document.body.appendChild(label);

  labels[city.name] = label;
}

export { dotsGroup, addDot };
