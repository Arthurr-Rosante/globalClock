import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { dotsGroup } from "./assets/addDot.js";
import drawCities from "./assets/drawCities.js";

// ========== IMPORTING THE ASSETS ========== //
import { earth } from "./assets/meshes/earth.js";
import { clouds } from "./assets/meshes/clouds.js";
import { atmosphere } from "./assets/meshes/atmosphere.js";
import { stars, createStars } from "./assets/meshes/stars.js";

// ========== BASIC SCENE SETUP ========== //
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// ========== CONTROLS CONFIGURATION ========== //
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2.5;
controls.maxDistance = 4;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = Math.PI - 0.8;
controls.enablePan = false;

// ========== RAYCASTER CONFIGURATION ========== //

// ========== THE LIGHTING OF THE SCENE ========== //

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(2, 3, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// ========== ASSEMBLING THE SCENE ========== //
const earthGroup = new THREE.Group();
earthGroup.add(dotsGroup);

scene.add(earthGroup);
// scene.add(stars);
createStars(2000, 20, 50);

earthGroup.add(earth);
earthGroup.add(clouds);
earthGroup.add(atmosphere);
drawCities();

const earthRotation = 0.0005; // default => 0.0005
const cloudsRotation = 0.0009; // default => 0.0009
const starsRotation = 0.0002; // default => 0.0002

// ========== ANIMATION LOOP ========== //
export const labels = {};
function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += earthRotation;
  dotsGroup.rotation.y += earthRotation;
  clouds.rotation.y += cloudsRotation;
  stars.rotation.y -= starsRotation;
  controls.update();

  dotsGroup.children.forEach((dot) => {
    const cityName = dot.name;
    const label = labels[cityName];

    // Converte a posição do ponto para coordenadas em 3D
    const vector = dot.getWorldPosition(new THREE.Vector3());
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

    // Atualiza a posição da label
    label.style.left = `${x}px`;
    label.style.top = `${y}px`;

    // Verifica se a distância é menor que o limite para mostrar o rótulo
    const distance = camera.position.distanceTo(
      dot.getWorldPosition(new THREE.Vector3())
    );
    if (distance < 1.5) {
      label.style.display = "block";
    } else {
      label.style.display = "none";
    }
  });

  renderer.render(scene, camera);
}
animate();
// ========== HANDLING THE RESIZE EVENT ========== //
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});
