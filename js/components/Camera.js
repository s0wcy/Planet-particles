import Renderer from './Renderer.js'

export default class Camera extends Renderer
{
    constructor()
    {
        super()
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

        // Listen for resize
        window.addEventListener('resize', () => this.resize())

        // Init camera
        this.camera = new THREE.PerspectiveCamera(
            this.properties.fov,
            this.properties.aspect,
            this.properties.near,
            this.properties.far
        )

        this.initCamera()

        this.getCamera = this.getCamera.bind(this)
    }

    initCamera() { this.camera.lookAt(this.properties.target) }

    // Setup & update functions
    resize()
    {
        this.screen.width = window.innerWidth
        this.screen.height = window.innerHeight

        // keep aspect ratio of camera
        this.properties.aspect = this.screen.width / this.screen.height
        this.camera.updateProjectionMatrix()

        this.$canvas.style.width = this.screen.width
        this.$canvas.style.height = this.screen.height
    }

    getCamera() { return this.camera }
}