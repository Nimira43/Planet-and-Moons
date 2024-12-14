const scene = new THREE.Scene() 
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
) 
const renderer = new THREE.WebGLRenderer() 

renderer.setSize(window.innerWidth, window.innerHeight) 
document.body.appendChild(renderer.domElement)

const planetGeometry = new THREE.SphereGeometry(1, 32, 32) 
const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x0077cc }) 
const planet = new THREE.Mesh(planetGeometry, planetMaterial) 
scene.add(planet)

camera.position.z = 5

function animate() { 
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()