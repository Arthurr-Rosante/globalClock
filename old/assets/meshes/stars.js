import * as THREE from "three";

const stars = new THREE.Group();

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

export { stars, createStars };
