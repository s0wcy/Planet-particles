import Controler from './Controler.js'

export default class Renderer extends Controler
{
    constructor()
    {
        super()
        this.screen =
        {
            width: window.innerWidth,
            height: window.innerHeight
        }

        document.body.appendChild(this.properties.renderer.domElement)

        // Lights
        this.light = null
        this.lightProperties =
        {
            color: 0xffffff,
            intensity: 1,
            distance: 1000,
            number: 1,
            decay: 0
        }

        // Postpro elements
        this.composer = null
        this.renderPass = null
        this.bloomPass = null

        // Bind & start the loop
        this.loop = this.loop.bind(this)
        this.loop()
    }

    update()
    {
        this.controler.update()
        this.initPostProcess()
        this.properties.renderer.setSize(this.screen.width, this.screen.height)
    }
    
    render(_properties)
    {
        this.properties.renderer.render(_properties.scene, _properties.camera)
    }

    // Lights

    initLight()
    {
        this.light = new THREE.PointLight(
            this.lightProperties.color,
            this.lightProperties.intensity,
            this.lightProperties.distance,
            this.lightProperties.number,
            this.lightProperties.decay
        )

        this.light.position.set(50, 50, 50)
        this.properties.scene.add(this.light)
    }

    // Postprocessing
    initPostProcess()
    {
        this.composer = new THREE.EffectComposer(this.properties.renderer)

        this.renderPass = new THREE.RenderPass(this.properties.scene, this.properties.camera)
        this.composer.addPass(this.renderPass)
        this.bloomShader()
    }

    bloomShader()
    {
        this.bloomPass = new THREE.UnrealBloomPass({
            intensity: 1,
            resolution: 0.9,
            kernelSize: 4,
            distinction: 2
        })

        // render 
        this.composer.addPass(this.bloomPass)
        this.bloomPass.renderToScreen = true
    }

    // Animation Loop
    loop()
    {
        requestAnimationFrame(this.loop)
        this.update()
        // this.render(this.properties)
        this.composer.render(this.properties)
    }
}