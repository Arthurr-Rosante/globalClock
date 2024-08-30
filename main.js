import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Setup basic parameters
const w = window.innerWidth;
const h = window.innerHeight;
const loader = new THREE.TextureLoader();

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("#canvas"),
});
renderer.setSize(w, h);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.minDistance = 3;
controls.maxDistance = 4;

controls.minPolarAngle = 0.5;
controls.maxPolarAngle = Math.PI - 0.8;

// Lighting
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Earth Setup
const earthGroup = new THREE.Group();
scene.add(earthGroup);

const earthTextures = {
  map: loader.load("/img/earth_day8k.jpg"),
  bumpMap: loader.load("/img/earth_bump4k.jpg"),
  specularMap: loader.load("/img/earth_specular4k.jpg"),
  emissiveMap: loader.load("/img/earth_night8k.jpg"),
};

const earthMaterial = new THREE.MeshPhongMaterial({
  ...earthTextures,
  bumpScale: 5,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.2,
});

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  earthMaterial
);
earthGroup.add(earth);

// Clouds
const cloudsMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/img/earth_clouds2k.jpg"),
  transparent: true,
  opacity: 0.2,
});

const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(2.01, 32, 32),
  cloudsMaterial
);
earthGroup.add(clouds);

// Atmosphere

// Stars
const stars = new THREE.Group();
scene.add(stars);

function createStars(numStars, minDistance, maxDistance) {
  const starGeometry = new THREE.SphereGeometry(0.05, 6, 6);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < numStars; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = THREE.MathUtils.lerp(
      minDistance,
      maxDistance,
      Math.random()
    );

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(x, y, z);
    stars.add(star);
  }
}

// Example usage
createStars(2000, 20, 100);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.001;
  clouds.rotation.y += 0.0015;
  stars.rotation.y -= 0.0002;

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handling Window Resize
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// Initial Camera Position
camera.position.z = 5;
