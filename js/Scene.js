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
        this.isClicked = true

        // Scene & Camera setup
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, this.screen.width / this.screen.height, 0.1, 1000)
        this.camera.position.z = 4
        this.createSphere()
        this.createSpace()
        this.controls = new THREE.OrbitControls(this.camera, this.renderer)
        this.controls.minDistance = 3
        this.controls.maxDistance = 10
        this.controls.rotateSpeed = 0.2
        this.controls.autoRotate = true
        this.controls.autoRotateSpeed = 0.5
        this.controls.maxPolarAngle = Math.PI / 1.5
        this.controls.minPolarAngle = 1
        this.renderer = new THREE.WebGLRenderer()

        // Events
        window.addEventListener('resize', () => this.resize())
        // window.addEventListener('mousedown', () => this.isClicked = true)
        // window.addEventListener('mouseup', () => this.isClicked = false)

        // Start the loop
        this.loop = this.loop.bind(this)
        this.loop()

        // Canvas
        this.$canvas = document.querySelector('canvas')
    }

    // Create sphere
    createSphere()
    {
        this.sphereGeometry = new THREE.SphereGeometry(2, 32, 32)
        this.wireframe = new THREE.WireframeGeometry(this.sphereGeometry)

        // Texture
        this.texture = new THREE.TextureLoader().load('../src/medias/textures/texture_01.jpg')

        // Material
        this.material = new THREE.MeshBasicMaterial(
            {
                map: this.texture,
                color: 0xFFFFFF,
                wireframe: false
            }
        )

        // Structure render
        this.sphere = new THREE.Mesh(this.sphereGeometry, this.material)

        // Adding to scene
        this.scene.add(this.sphere)
    }

    createSpace()
    {
        this.starsGeometry = new THREE.Geometry();

        for ( var i = 0; i < 10000; i ++ )
        {
            this.star = new THREE.Vector3()
            this.star.x = THREE.Math.randFloatSpread(2000)
            this.star.y = THREE.Math.randFloatSpread(2000)
            this.star.z = THREE.Math.randFloatSpread(2000)

            this.starsGeometry.vertices.push( this.star )
        }

        this.starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } )
        this.starField = new THREE.Points( this.starsGeometry, this.starsMaterial )

        this.scene.add( this.starField )
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
        this.controls.update()
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