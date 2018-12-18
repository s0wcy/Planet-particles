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

        // Bind & start the loop
        this.loop = this.loop.bind(this)
        this.loop()
    }

    update()
    {
        this.controler.update()
        this.properties.renderer.setSize(this.screen.width, this.screen.height)
    }
    
    render(_properties)
    {
        this.properties.renderer.render(_properties.scene, _properties.camera)
    }

    // Animation Loop
    loop()
    {
        requestAnimationFrame(this.loop)
        this.update()
        this.render(this.properties)
        // this.composer.render(this.properties)
    }
}