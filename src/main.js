import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import "./style.css";

let container;

let camera, scene, renderer;

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
  TWEEN.update();
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

  return rotations[index];
}

function applyRotation(rotation) {
  const target = {
    x: (rotation.x || 0) * Math.PI,
    y: (rotation.y || 0) * Math.PI,
    z: (rotation.z || 0) * Math.PI,
  };

  const duration = 300;

  if (
    Object.entries(target).every(
      ([key, value]) => object.rotation["_" + key] === value
    )
  ) {
    new TWEEN.Tween(object.rotation)
      .to(
        Object.entries(target)
          .map(([key, value]) => [key, value + Math.random() * 0.5])
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        duration / 2
      )
      .easing(TWEEN.Easing.Quadratic.In)
      .onComplete(() => {
        new TWEEN.Tween(object.rotation)
          .to(target, duration / 2)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      })
      .start();
  } else {
    new TWEEN.Tween(object.rotation)
      .to(target, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
}
