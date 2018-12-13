export default class Scene
{
    constructor()
    {
        // Window size
        this.screen =
        {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // Booleans
        this.isClicked = false

        // Scene & Camera setup
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, this.screen.width / this.screen.height, 0.1, 1000)
        this.camera.position.z = 4
        this.createSphere()
        this.controls = new THREE.OrbitControls(this.camera, this.renderer)
        this.renderer = new THREE.WebGLRenderer()

        // Events
        window.addEventListener('resize', () => this.resize())
        window.addEventListener('mousedown', () => this.isClicked = true)
        window.addEventListener('mouseup', () => this.isClicked = false)

        // Start the loop
        this.loop = this.loop.bind(this)
        this.loop()

        // Canvas
        this.$canvas = document.querySelector('canvas')
    }

    // Create sphere
    createSphere()
    {
        this.geometry = new THREE.SphereGeometry(2, 32, 32)
        this.texture = new THREE.TextureLoader().load('../src/medias/textures/texture_01.jpg')
        this.material = new THREE.MeshBasicMaterial(
            {
                map: this.texture,
                color: 0xFFFFFF,
                wireframe: false
            }
        )
        this.sphere = new THREE.Mesh(this.geometry, this.material)

        this.scene.add(this.sphere)
    }

    // Texture the sphere
    textureSphere()
    {

    }

    // Interact object functions
    rotateElement(_e)
    {
        _e.rotation.x += 0.001
        _e.rotation.y += 0.005
    }

    // Setup & update functions
    resize()
    {
        this.screen.width = window.innerWidth
        this.screen.height = window.innerHeight

        // keep aspect ratio of camera
        this.camera.aspect = this.screen.width / this.screen.height
        this.camera.updateProjectionMatrix()

        this.$canvas.style.width = this.screen.width
        this.$canvas.style.height = this.screen.height
    }

    update()
    {
        this.renderer.setSize(this.screen.width, this.screen.height)
        document.body.appendChild(this.renderer.domElement)
    }

    render()
    {
        this.renderer.render(this.scene, this.camera)
    }

    loop()
    {
        requestAnimationFrame(this.loop)
        this.update()
        if(!this.isClicked)
        {
            this.rotateElement(this.sphere)
        }
        this.render()
    }
}