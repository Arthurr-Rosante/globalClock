import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Setup basic parameters
const loader = new THREE.TextureLoader();
const canvas = document.getElementById("canvas");

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2.5;
controls.maxDistance = 4;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = Math.PI - 0.8;
controls.enablePan = false;

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(2, 3, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

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
  new THREE.SphereGeometry(2, 50, 50),
  earthMaterial
);
earthGroup.add(earth);

// Coordinate System
const dotsGroup = new THREE.Group();
earthGroup.add(dotsGroup);

function addDot(lat, lon, color = 0xff0000) {
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.015, 8, 8),
    new THREE.MeshBasicMaterial({ color })
  );

  const radius = 2 + 0.001; // garante que se mantenha acima da superfície
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon * -1);

  dot.position.set(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );

  dotsGroup.add(dot);
}
addDot(1, 1, 0x0000ff); // central Point

// Clouds
const cloudsMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/img/earth_clouds2k.jpg"),
  transparent: true,
  opacity: 0.2,
});

const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(2.01, 50, 50),
  cloudsMaterial
);
earthGroup.add(clouds);

// Atmosphere
const atmosphereVertexShader = `
  varying vec3 vertexNormal;

  void main() {
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0.9);
  }
`;
const atmosphereFragmentShader = `
  varying vec3 vertexNormal;
  void main() {
    float intensity = pow(1.1 - dot(vertexNormal, vec3(0, 0, 1.0)), 10.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
  }
`;
const atmosphereGeometry = new THREE.SphereGeometry(2, 50, 50);
const atmosphereMaterial = new THREE.ShaderMaterial({
  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
});
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
earthGroup.add(atmosphere);

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
createStars(2000, 20, 100);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.0005;
  dotsGroup.rotation.y += 0.0005;
  clouds.rotation.y += 0.0009;
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

// User Interactivity

// cidades
async function drawCities() {
  const colors = [
    0x01cdfe, 0x7fffd4, 0xf8dd4c, 0xff265b, 0xededf9, 0xa601d7, 0x00ff00,
    0x000066, 0xff6600,
  ];
  try {
    const res = await fetch("./cities.json");
    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await res.json();
    data.forEach((city) => {
      const rand = Math.floor(Math.random() * colors.length - 1);
      addDot(city.latitude, city.longitude, colors[rand]);
    });
  } catch (error) {
    console.error(error.message);
  }
}
drawCities();
