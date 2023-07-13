import * as THREE from './libs/three.module.js';
import {OBJLoader} from './libs/OBJLoader.js';
import {MTLLoader} from './libs/MTLLoader.js';
import {GLTFLoader} from './libs/GLTFLoader.js';

export const Head = {
    manager: 0,

    loaded: false,

    objHref: /*window.location.href +*/ './assets/head/head.obj',

    mtlHref:  './assets/head/head.mtl',

    load: function(mesh) {

        const mtlLoader = new MTLLoader(this.manager);
        mtlLoader.load(Head.mtlHref, (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader(this.manager);
            objLoader.setMaterials(mtl);
            objLoader.load(Head.objHref, (obj) => {
                this.obj=obj;
                obj.position.x+=0.05;
                obj.position.z+=0.1;
                obj.scale.set(0.2,0.2,0.2);
                obj.rotation.y=(Math.PI/2);
                obj.traverse(( node )=>{
                    if ( node instanceof THREE.Mesh ) {
                        node.castShadow = true;
                    }
                });

                mesh.add(obj);
            });
        });

    },

}

export class chainSaw{
    constructor(params){

        this.mesh=params.scene;
        this.manager=new THREE.LoadingManager();
        this.objHref= './assets/chainsaw/chainsaw.obj';
        this.mtlHref= './assets/chainsaw/chainsaw.mtl';
        this.obj=0;

    }

    load(){
        this.manager.onLoad=function(){
            this.loaded=true;
        }

        const mtlLoader = new MTLLoader(this.manager);
        mtlLoader.load(this.mtlHref, (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader(this.manager);
	    for (const material of Object.values(mtl.materials)) {
		material.color=new THREE.Color(0x202020);
		material.reflectivity=0.1;
	  	material.specular=new THREE.Color(0x928D8D);
	    }
            objLoader.setMaterials(mtl);
            objLoader.load(this.objHref, (object) => {
                object.scale.set(0.7,0.6,0.7);
                var box = new THREE.Box3().setFromObject(object);
                const boxSize = box.getSize(new THREE.Vector3());

                let pivot=new THREE.Object3D();
                pivot.position.y+=0.5*boxSize.y;
                pivot.add(object);
                this.mesh.add(pivot);

                let tween1=new TWEEN.Tween(object.rotation)
                .to({y:Math.PI},500)
                .easing(TWEEN.Easing.Linear.None)
                .repeat(Infinity)
                .onUpdate((tweenObj)=>{
                    object.rotation.y+=tweenObj.y;
                })
                .start();
            });

        });
    }
}

export class Star{
	constructor(params){

        this.mesh=params.scene;
        this.manager=new THREE.LoadingManager();

        this.objHref= './assets/Star/star.obj';
        this.mtlHref= './assets/Star/star.mtl';
        this.obj=0;

    }

    load(){
        this.manager.onLoad=function(){
        }
        this.manager.onProgress= function(url, itemsLoaded, itemsTotal){

        }

        const mtlLoader = new MTLLoader(this.manager);
        mtlLoader.load(this.mtlHref, (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader(this.manager);

            objLoader.setMaterials(mtl);
            objLoader.load(this.objHref, (object) => {

                object.scale.set(0.25,0.25,0.25);
				object.rotation.x=Math.PI*0.5;
                var box = new THREE.Box3().setFromObject(object);
                const boxSize = box.getSize(new THREE.Vector3());

                let pivot=new THREE.Object3D();
                pivot.position.y+=0.5*boxSize.y;
                pivot.add(object);
                this.mesh.add(pivot);

            });

        });
    }
}

export class Heart{
	constructor(params){

        this.mesh=params.scene;
        this.manager=new THREE.LoadingManager();
        this.objHref= './assets/heart/heart.obj';
        this.mtlHref= './assets/heart/heart.mtl';
        this.obj=0;

    }

    load(){
        this.manager.onLoad=function(){

        }
        this.manager.onProgress= function(url, itemsLoaded, itemsTotal){

        }

        const mtlLoader = new MTLLoader(this.manager);
        mtlLoader.load(this.mtlHref, (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader(this.manager);
			for (const material of Object.values(mtl.materials)) {
				material.color=new THREE.Color(0xFF0000);
   			}
            objLoader.setMaterials(mtl);
            objLoader.load(this.objHref, (object) => {
                object.scale.set(0.01,0.01,0.01);
                var box = new THREE.Box3().setFromObject(object);
                const boxSize = box.getSize(new THREE.Vector3());

                let pivot=new THREE.Object3D();
                pivot.position.y+=0.5*boxSize.y;
                pivot.add(object);
                this.mesh.add(pivot);

            });

        });
    }
}

export class Rock{
	constructor(params){

        this.mesh=params.scene;
        this.manager=new THREE.LoadingManager();

        this.objHref= './assets/rock/Rock1.obj';
        this.mtlHref= './assets/rock/Rock1.mtl';
        this.obj=0;

    }

    load(){
        this.manager.onLoad=function(){
        }
        this.manager.onProgress= function(url, itemsLoaded, itemsTotal){
            //console.log("loaded: " + url);
            //console.log("left: "+ itemsTotal-itemsLoaded);
        }
		let meshAux=this.mesh;

        const mtlLoader = new MTLLoader(this.manager);
        mtlLoader.load(this.mtlHref, (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader(this.manager);
            objLoader.setMaterials(mtl);
            objLoader.load(this.objHref, (object) => {

                var box = new THREE.Box3().setFromObject(object);

                const boxSize = box.getSize(new THREE.Vector3());
				object.traverse( function ( child ) {
					if ( child instanceof THREE.Object3D  ) {
						if(child.name=='Cube'){
							let pivot=new THREE.Object3D();
							child.scale.set(0.1,0.1,0.1)
			                pivot.position.y+=0.5*boxSize.y;
			                pivot.add(child);
							meshAux.add(pivot);
						}
					}
				});

            });

        });
    }
}

export class Stalagmites{

    constructor(params){
		this.loadingManager=params.loadingManager;
        this.loader=new GLTFLoader(this.loadingManager);
        this.gltfHref='./assets/stalagmites/scene.gltf';
    }

    onLoadFunction(gltf){

        scene.add(gltf.scene);

        gltf.animations; 
        gltf.scene; 
        gltf.scenes; 
        gltf.cameras; 
        gltf.asset; 

    }

    onProgressFunction(xhr){

    }

    loadStal2(scene){

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function dumpObject(obj, lines = [], isLast = true, prefix = '') {
            const localPrefix = isLast ? '└─' : '├─';
            lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
            const newPrefix = prefix + (isLast ? '  ' : '│ ');
            const lastNdx = obj.children.length - 1;
            obj.children.forEach((child, ndx) => {
            const isLast = ndx === lastNdx;
            dumpObject(child, lines, isLast, newPrefix);
            });
            return lines;
        }

        this.loader.load( this.gltfHref, (gltf)=>{
            let root = gltf.scene;
            let stalagmite = root.getObjectByName('stalagmite_2');
            stalagmite.rotation.z=Math.PI;
            stalagmite.position.y=getRandomArbitrary(20, 60);
            stalagmite.position.x=getRandomArbitrary(-80, 80);
            stalagmite.position.z=getRandomArbitrary(-200, -10);
            stalagmite.scale.set(getRandomArbitrary(0.05, 0.2),getRandomArbitrary(0.05, 0.2),getRandomArbitrary(0.05, 0.2));
            scene.add(stalagmite);
        }, this.onProgressFunction );


    }



}
