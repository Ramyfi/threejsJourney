import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'


/**
 * Debug 
 */

const gui = new GUI({
    width: 300,
    title: 'Nice Debug UI',
    closeFolders: false
})
// gui.close()
// gui.hide()
window.addEventListener('keydown', (event) => {
    if(event.key == 'h')
        gui.show(gui._hidden)
})
const debugObject = {}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

debugObject.color = '#3a6ea6'

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

// const geometry = new THREE.BufferGeometry()

// const count = 5000

// const positionsArray = new Float32Array(count * 3 * 3)
// for (let i = 0; i < count * 3 * 3; i++)
//     {
//         positionsArray[i] = (Math.random() - 0.5) * 4
//     }

// const positionsAttribute  = new THREE.BufferAttribute(positionsArray, 3)

// geometry.setAttribute('position', positionsAttribute)

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('Awesome Cube')
// cubeTweaks.close() // closed on load

cubeTweaks.add(mesh.position, 'y', -3, 3, 0.01).name('elevation')

cubeTweaks.add(mesh, 'visible')
cubeTweaks.add(material, 'wireframe')
cubeTweaks.addColor(debugObject, 'color')
    .onChange((value) => {
        material.color.set(debugObject.color)
    })

    debugObject.spin = () => {
        gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2})
    }
    cubeTweaks.add(debugObject, 'spin')

    debugObject.subdivision = 2
    cubeTweaks.add(debugObject, 'subdivision', 1, 10, 1).onFinishChange(() => {
        mesh.geometry.dispose() // disposes old gemotries to prevent memory leaks
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })
// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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