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