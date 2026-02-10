import * as THREE from "three";

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
export const atmosphere = new THREE.Mesh(
  atmosphereGeometry,
  atmosphereMaterial
);
