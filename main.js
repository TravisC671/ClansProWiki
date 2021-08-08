import './style.css'

import * as THREE from 'three';

//The world needs 3 things. a Scene, a Camera, and a Renderer
const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 20, 10000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector( '#bg' ),
  antialias: true
})

renderer.setPixelRatio( window.devicePixelRatio );
camera.position.setZ(800)

renderer.render( scene, camera )

var body = document.body,
  html = document.documentElement;

var height = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight);

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

Array(height).fill().forEach(addStar)

console.log(height)
function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = (t * -1) +400;
  camera.position.y = t;
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate );
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}
animate()