import * as THREE from "three";
const loader = new THREE.TextureLoader();

const earthTextures = {
  map: loader.load("./assets/img/earth_day8k.jpg"),
  bumpMap: loader.load("./assets/img/earth_bump4k.jpg"),
  specularMap: loader.load("./assets/img/earth_specular4k.jpg"),
  emissiveMap: loader.load("./assets/img/earth_night8k.jpg"),
};

const earthMaterial = new THREE.MeshPhongMaterial({
  ...earthTextures,
  bumpScale: 5,
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.2,
});

export const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 50, 50),
  earthMaterial
);
