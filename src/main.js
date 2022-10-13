import * as THREE from "three";

// import { OBJLoader } from "three/addons/loaders/OBJLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import "./style.css";

let container;

let camera, scene, renderer;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let object;

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 20;

  // scene

  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  camera.add(pointLight);
  scene.add(camera);

  // manager

  function loadModel() {
    scene.add(object);
  }

  const manager = new THREE.LoadingManager(loadModel);

  // model

  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log("model " + Math.round(percentComplete, 2) + "% downloaded");
    }
  }

  function onError() {}

  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.load(
    "dice.gltf",
    (gltf) => {
      let root = gltf.scene;
      object = root;
    },
    onProgress,
    onError
  );

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener("click", onDocumentMouseClick);

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseClick() {
  applyRotation(randomRoll());
}

//

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

function randomRoll() {
  const index = Math.floor(Math.random() * 6);

  const rotations = [
    { y: 0.5 },
    { x: 1.5 },
    { y: 1.5 },
    { x: 0.5 },
    {},
    { y: 1 },
  ];

  console.log(index + 1);

  return rotations[index];
}

function applyRotation(rotation) {
  // object.rotation.x = 0;
  // object.rotation.y = 0;
  // object.rotation.z = 0;

  // const xAxis = new THREE.Vector3(1, 0, 0);
  // const yAxis = new THREE.Vector3(0, 1, 0);
  // const zAxis = new THREE.Vector3(0, 0, 1);
  // object.rotateOnWorldAxis(xAxis, (rotation.x || 0) * Math.PI);
  // object.rotateOnWorldAxis(yAxis, (rotation.y || 0) * Math.PI);
  // object.rotateOnWorldAxis(zAxis, (rotation.z || 0) * Math.PI);

  // console.log(object.position, object.rotation);

  object.rotation.x = (rotation.x || 0) * Math.PI;
  object.rotation.y = (rotation.y || 0) * Math.PI;
  object.rotation.z = (rotation.z || 0) * Math.PI;

  // object.rotateX(rotation.x * Math.PI || 0);
  // object.rotateY(rotation.y * Math.PI || 0);
  // object.rotateZ(rotation.z * Math.PI || 0);
}
