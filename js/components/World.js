export default class World
{
    constructor()
    {
        this.scene = new THREE.Scene()

        this.createParticles(100000, 0.05 * 5, 0xff2222, 20)
        this.createParticles(100000, 0.05 * 5, 0xff7979, 50)
        this.createParticles(10000, 0.05 * 5, 0xF3EED9, 60)
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

        // Apply png texture to our particles
        this.image = new Image()
        this.texture = new THREE.Texture(this.image)
        this.texture.needsUpdate = true
        this.image.src = './src/medias/img/particle-1.png'

        this.material = new THREE.PointsMaterial({ color: _color, size: _particleSize, map: this.texture, blending: THREE.AdditiveBlending })
        this.material.depthTest = false
        this.particles = new THREE.Points(this.planet, this.material)

        this.scene.add(this.particles)
    }
}