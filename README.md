# Planet Particles
Experience interactive gestion of a civilisation.

### Built With
- HTML5
- JavaScript ES6 - WebGL using [THREE.JS](https://threejs.org/docs/index.html)

![ES6](https://cdn.iconscout.com/icon/free/png-128/javascript-1-225993.png) **+** ![WebGL](https://www.uplabs.com/tools/webgl.png)

### Installing

A online demo is available : **[PlanetParticles](http://www.achabe.com/webgl/)**

I recommend using a emulated server (MAMP will do the work) if you decide to edit or fork this project locally.
You can also use **[serve](https://www.npmjs.com/package/serve)** command to emulate your server quickly directly on your terminal : `npm install -g serve`. (works on VS Code too)

### Main features
- THREE.JS planet particles
- Custom OrbitControls
- Bloom shader

### How it works ?

In "components" you will find all we need to render our scene :
- Camera = create a camera and define his properties, also take care of responsive.
- Controler = create an OrbitControls & customise it.
- World = define the scene & each elements who will be placed in.
- Renderer = apply any postprocessing elements as bloom shader & fxaa antialiasing.


### Author

[**Alexandre Chabeau**](http://www.achabe.com)

Have fun modifying it :+1:
