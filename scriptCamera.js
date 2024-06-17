import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

// console.log(OrbitControls)
 // Cursor
const cursor = {
    x:0,
    y:0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})



const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
// //     100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
console.log(camera.position.length(mesh.position))
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 1
// controls.update()

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.y = elapsedTime;

    //update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    // Update controls
    controls.update()


    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
