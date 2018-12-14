export default class World
{
    constructor()
    {
        this.scene = new THREE.Scene()

        this.createSpace()
        this.createPlanet()

        this.getScene = this.getScene.bind(this)
    }

    createPlanet()
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

        for (var i = 0; i < 10000; i++) {
            this.star = new THREE.Vector3()
            this.star.x = THREE.Math.randFloatSpread(2000)
            this.star.y = THREE.Math.randFloatSpread(2000)
            this.star.z = THREE.Math.randFloatSpread(2000)

            this.starsGeometry.vertices.push(this.star)
        }

        this.starsMaterial = new THREE.PointsMaterial({ color: 0x888888 })
        this.starField = new THREE.Points(this.starsGeometry, this.starsMaterial)

        this.scene.add(this.starField)
    }

    getScene() { return this.scene }
}