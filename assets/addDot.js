import * as THREE from "three";

const dotsGroup = new THREE.Group();

function addDot(lat, lon, color = 0x33ffd1) {
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.009, 8, 8),
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

export { dotsGroup, addDot };
