export default class World
{
    constructor()
    {
        this.scene = new THREE.Scene()

        this.createParticles(100000, 0.05, 0x9D001C, 20)
        this.createParticles(100000, 0.05, 0xff7979, 50)
        this.createParticles(10000, 0.05, 0xF3EED9, 60)

        this.getScene = this.getScene.bind(this)
    }

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

    createParticles(_amount, _particleSize, _color, _radius)
    {
        this.planet = new THREE.BufferGeometry()
        this.pos = []

        for(let i = 0; i < _amount; i++)
        {
            this.vertex = this.randParticles(_radius)
            this.pos.push(this.vertex.x, this.vertex.y, this.vertex.z)
        }
        this.planet.addAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3))

        this.material = new THREE.PointsMaterial({ color: _color, size: _particleSize })
        this.particles = new THREE.Points(this.planet, this.material)

        this.scene.add(this.particles)
    }

    getScene() { return this.scene }
}