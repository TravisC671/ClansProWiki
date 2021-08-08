import './style.css'

import * as THREE from 'three';

//The world needs 3 things. a Scene, a Camera, and a Renderer
const scene = new THREE.Scene();


//the values for the camera are (fov, aspect ratio, the near clipping plane, the far clipping plane)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 20, 10000)
camera.position.setZ(800)

//sets the render to the canvas object in the index.html
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector( '#bg' ),
  antialias: true
})

//sets the resolution
renderer.setPixelRatio( window.devicePixelRatio );

//sets the renderer to render using the scene and camera
renderer.render( scene, camera )

//gets the height which is used to distribute the stars
var body = document.body,
  html = document.documentElement;

var height = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight);

//function to distribute the stars
function addStar() {
  const geometry = new THREE.SphereGeometry( 1, 3, 2)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);

  const x = THREE.MathUtils.randFloatSpread(window.innerWidth)
  const y = THREE.MathUtils.randInt(height/-1, 500)
  const z = THREE.MathUtils.randFloatSpread(1200, -1200)
  star.position.set(x,y,z)
  scene.add(star)
}

//array that loops and calls addStar depending on the height of your monitor.(tbh idk why i did that)
Array(height).fill().forEach(addStar)

console.log(height)

//moves the camera on the x and y when the page is scrolled
document.body.onscroll = moveCamera

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = (t * -1) +400;
  camera.position.y = t;
}

//this is called every frame, allowing the page to be animated as well as resizing the canvas when the window is resized. it does warp the stars but its not too noticable
function animate() {
  requestAnimationFrame( animate );
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}
animate()