const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffddee, 1)
directionalLight.position.set(5, 5, 5)
directionalLight.castShadow = true
scene.add(directionalLight)

const planetGeometry = new THREE.SphereGeometry(1, 32, 32)
const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x0077cc, metalness: 0.5, roughness: 0.1 })
const planet = new THREE.Mesh(planetGeometry, planetMaterial)
planet.castShadow = true
planet.receiveShadow = true
scene.add(planet)

const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32)
const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xbf580e, metalness: 0.5, roughness: 0.1 })

const moon1 = new THREE.Mesh(moonGeometry, moonMaterial)
moon1.position.set(2, 0, 0)
moon1.castShadow = true
moon1.receiveShadow = true
scene.add(moon1)

const moon2 = new THREE.Mesh(moonGeometry, moonMaterial)
moon2.position.set(0, 2, 0)
moon2.castShadow = true
moon2.receiveShadow = true
scene.add(moon2)

const moon3 = new THREE.Mesh(moonGeometry, moonMaterial)
moon3.position.set(0, 0, 2)
moon3.castShadow = true
moon3.receiveShadow = true
scene.add(moon3)

const starTexture = new THREE.TextureLoader().load('./images/star.png')

function createStarField() {
  const starsGeometry = new THREE.BufferGeometry()
  const starCount = 1000
  const positions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = THREE.MathUtils.randFloatSpread(200)
  }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    map: starTexture,
    transparent: true
  })
  const starField = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(starField)
} 

createStarField() 
camera.position.z = 5 

function animate() { 
  requestAnimationFrame(animate) 
  planet.rotation.y += 0.01   
  moon1.position.x = Math.cos(Date.now() * 0.001) * 2
  moon1.position.z = Math.sin(Date.now() * 0.001) * 2
  moon2.position.y = Math.cos(Date.now() * 0.001) * 2 
  moon2.position.z = Math.sin(Date.now() * 0.001) * 2 
  moon3.position.x = Math.cos(Date.now() * 0.001) * 2 
  moon3.position.y = Math.sin(Date.now() * 0.001) * 2 
  renderer.render(scene, camera) 
} 

animate()

