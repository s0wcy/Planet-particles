import Renderer from './Renderer.js'

export default class Camera
{
    constructor()
    {
        //super()
        this.screen =
        {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.properties =
        {
            fov: 75,
            aspect: this.screen.width / this.screen.height,
            near: 0.8,
            far: 100,
            target: new THREE.Vector3(0, 0, 0)
        }

        this.camera = null

        // Init camera
        this.camera = new THREE.PerspectiveCamera(
            this.properties.fov,
            this.properties.aspect,
            this.properties.near,
            this.properties.far
        )

        this.initCamera()

        // Listen for resize
        window.addEventListener('resize', () => this.resize())

        this.getCamera = this.getCamera.bind(this)
    }

    // Config where our camera will look
    initCamera()
    {
        this.camera.lookAt(this.properties.target)
        this.camera.position.set(4, 0, 4)
    }

    // Setup & update functions
    resize()
    {
        this.screen.width = window.innerWidth
        this.screen.height = window.innerHeight

        // keep aspect ratio of camera
        this.properties.aspect = this.screen.width / this.screen.height
        this.camera.updateProjectionMatrix()
        
        this.$canvas = document.querySelector('canvas')
        this.$canvas.style.width = this.screen.width
        this.$canvas.style.height = this.screen.height
    }

    getCamera() { return this.camera }
}