import * as THREE from "three";
const loader = new THREE.TextureLoader();

const earthTextures = {
  map: loader.load("/images/earth_day8k.jpg"),
  bumpMap: loader.load("/images/earth_bump4k.jpg"),
  specularMap: loader.load("/images/earth_specular4k.jpg"),
  emissiveMap: loader.load("/images/earth_night8k.jpg"),
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
