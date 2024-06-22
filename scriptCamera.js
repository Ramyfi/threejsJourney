import './style.css';
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
    new THREE.BoxGeometry(1, 1, 1, 4, 4, 4),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe : true})
)

scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    // web kit for Safari

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement)
        {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
            {
                canvas.webkitFullscreen()
            }
    }
    else
    {
        if(document.exitFullscreen)
            {
                document.exitFullscreen()
            }
        else if(document.webkitExitFullScreen) {
            document.exitFullscreen()
        }

    }
})


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
camera.position.z = 5
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
