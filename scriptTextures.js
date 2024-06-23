import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { color, textureBicubic } from 'three/examples/jsm/nodes/Nodes.js'
// import imageSource from './color.jpg'


/**
 * Textures
 */

// const image = new Image()
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace

// image.onload = () => {
//     texture.needsUpdate = true
// }

// image.src = '/static/textures/door/color.jpg'
// above is older format 

const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () => {
//     console.log('loading started')
// }

// loadingManager.onLoad = () => {
//     console.log('loading finished')
// }

// loadingManager.onProgress = () => {
//     console.log('onProgress')
// }

// loadingManager.onError = () => {
//     console.log('onError')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load(
    // 'static/textures/door/color.jpg'
    // 'static/textures/checkerboard-1024x1024.png'
    // 'static/textures/checkerboard-8x8.png'
    'static/textures/minecraft.png'
    // ,
    // () => {
    //     console.log('load')
    // },
    // () => {
    //     console.log('progress')  // loading manager handles this, refer above
    // },
    // (error) => {
    //     console.log(error)
    // }
)
const alphaTexture = textureLoader.load('static/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('static/textures/door/height.jpg')
const normalTexture = textureLoader.load('static/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('static/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('static/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('static/textures/door/roughness.jpg')
//above is new format

colorTexture.colorSpace = THREE.SRGBColorSpace 

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping


// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false // if using nearest filter with min filter, deactivate mip maps to increase performance
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter // Nearest Filter is better for performance
 

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
// console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: colorTexture})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()