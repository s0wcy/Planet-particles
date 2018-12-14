export default class World
{
    constructor()
    {
        this.scene = new THREE.Scene()

        this.createParticles(5000)

        this.getScene = this.getScene.bind(this)
    }

    // createPlanet()
    // {
    //     this.sphereGeometry = new THREE.SphereGeometry(2, 32, 32)
    //     this.wireframe = new THREE.WireframeGeometry(this.sphereGeometry)

    //     // Texture
    //     this.texture = new THREE.TextureLoader().load('../src/medias/textures/texture_01.jpg')

    //     // Material
    //     this.material = new THREE.MeshBasicMaterial(
    //         {
    //             map: this.texture,
    //             color: 0xFFFFFF,
    //             wireframe: false
    //         }
    //     )

    //     // Structure render
    //     this.sphere = new THREE.Mesh(this.sphereGeometry, this.material)

    //     // Adding to scene
    //     this.scene.add(this.sphere)
    // }

    randParticles(_radius)
    {
        this.vector = new THREE.Vector3()

        this.x = THREE.Math.randFloat(-1, 1)
        this.y = THREE.Math.randFloat(-1, 1)
        this.z = THREE.Math.randFloat(-1, 1)
        this.normalize = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)

        this.vector.x = this.x * this.normalize * _radius
        this.vector.y = this.y * this.normalize * _radius
        this.vector.z = this.z * this.normalize * _radius

        return this.vector
    }

    createParticles(_amount)
    {
        this.planet = new THREE.BufferGeometry()
        this.pos = []

        for(let i = 0; i < _amount; i++)
        {
            this.vertex = this.randParticles(50)
            this.pos.push(this.vertex.x, this.vertex.y, this.vertex.z)
        }
        this.planet.addAtribute('position', new THREE.Float32BufferAttribute(this.pos, 3))

        this.material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 })
        this.particles = new THREE.Points(this.planet, this.material)

        this.scene.add(this.particles)
    }

    getScene() { return this.scene }
}

// Space

// this.starsGeometry = new THREE.Geometry();

// for (var i = 0; i < 10000; i++) {
//     this.star = new THREE.Vector3()
//     this.star.x = THREE.Math.randFloatSpread(2000)
//     this.star.y = THREE.Math.randFloatSpread(2000)
//     this.star.z = THREE.Math.randFloatSpread(2000)

//     this.starsGeometry.vertices.push(this.star)
// }

// this.starsMaterial = new THREE.PointsMaterial({ color: 0x888888 })
// this.starField = new THREE.Points(this.starsGeometry, this.starsMaterial)

// this.scene.add(this.starField)