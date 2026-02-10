import * as THREE from "three";

const cloudsMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("/images/earth_clouds2k.jpg"),
  transparent: true,
  opacity: 0.2,
});

export const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(2.01, 50, 50),
  cloudsMaterial
);
