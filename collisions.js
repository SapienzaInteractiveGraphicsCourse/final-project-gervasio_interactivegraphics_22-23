import * as THREE from './libs/three.module.js';

const Right=0;
const Left=1;
const Center=2;

const STAR=0;
const HEART=1;
const CHAINSAW=2;

let score=0;
let totalHearts=0;
let actualHearts=0;

export class CollisionsDetector{

    constructor(params){

        this.player=params.player;
        this.parts=this.player.getCharacterParts();
        this.character=this.parts.character;
        this.waist=this.parts.waist;

        this.world=params.world;

        this.animationManager=params.animationManager;

        this.detected={};
        this.gameOverFlag=false;
        this.invulnerableFlag=false;

        this.detectedLength=0;
    }

    getgameOverFlag(){
        return this.gameOverFlag;
    }

    getScore(){
        return score;
    }

    getHearts(){
        return 3-this.detectedLength;
    }


    blink(){
        function recursiveBlink(timeWhenBlink, totalTime, timeOfBlink, group){
            if(timeOfBlink==0 || timeWhenBlink==0){
                return;
            }
            if(totalTime-timeWhenBlink<=0){
                setTimeout(()=>{
                    group.traverse((node)=>{
                        if(node.isMesh){
			    var material = node.material.clone()
			    material.transparent = !material.transparent
			    material.opacity = 1.0 - material.opacity;
			    node.material = material;
                        }
                    });
                }, timeWhenBlink);
                return;
            }

            setTimeout(()=>{
                group.traverse((node)=>{
                    if(node.isMesh){
			var material = node.material.clone()
			material.transparent = !material.transparent
			material.opacity = 1.0 - material.opacity;
			node.material = material;
                    } 
                });
            }, timeWhenBlink);
	
 	    recursiveBlink(timeWhenBlink+timeOfBlink, totalTime, timeOfBlink, group);

        }

        this.character=this.parts.waist;
        recursiveBlink(1, 1400, 1399, this.character);
        recursiveBlink(1401, 2300, 50, this.character);
        recursiveBlink(2301, 3000, 10, this.character);

    }

    Update(timeElapsed){

        let objects=this.world.getObjects();
        let playerBox=this.player.getCharacterBox();
        let collisionDetected=false;

        this.detectedLength=0;
        for(let key of Object.keys(this.detected)){
            if(this.detected[key]==2){
                this.detectedLength++;
            }
        }
        this.detectedLength-=totalHearts;
        if(this.detectedLength>=3){
            this.gameOverFlag=true;
            this.animationManager.fallAnimation();

        }

        if(!this.invulnerableFlag){
            if(!this.gameOverFlag){

                for(let obj of objects[Right]){
                    obj.Update(timeElapsed);
                    this.player.updateCharacterBox();
                    let col=obj.getCollider();
                    if(col.intersectsBox(playerBox)){

                        let mesh=obj.getMesh();
                        let type=obj.getType();
                        let id=mesh.id;

                        if(!(id in this.detected)){

                            switch(type){
                                case CHAINSAW:
                                    this.detected[id]=CHAINSAW;
                                    collisionDetected=true;
                                    this.invulnerableFlag=true;
                                    if(actualHearts>0){
                                        actualHearts--;
                                    }
                                    else{
                                        this.waist.position.z+=1;
                                    }
                                    if(this.detectedLength<2){
                                        this.blink();
                                    }
                                    setTimeout(()=>{
                                        this.invulnerableFlag=false,
                                        console.log("not invulnerabile")
                                        ;}, 3100);
                                    console.log("invulnerabile")
                                return


                                case HEART:
                                    mesh.visible = false;
                                    this.detected[id]=HEART;
                                    if (this.waist.position.z>0){
                                        this.waist.position.z+=-1;
                                        totalHearts++;
                                    }
                                    else{
                                        actualHearts++;
                                        totalHearts++;
                                    }


                                break;

                                case STAR:
                                    mesh.visible = false;
                                    this.detected[id]=STAR;
                                    score++;
                                break;
                            }

                        }
                    }
                }



                for(let obj of objects[Center]){
                    obj.Update(timeElapsed);
                    this.player.updateCharacterBox();

                    let col=obj.getCollider();

                    if(col.intersectsBox(playerBox)){

                        let mesh=obj.getMesh();
                        let type=obj.getType();

                        let id=mesh.id;


                        if(!(id in this.detected)){

                            switch(type){
                                case CHAINSAW:
                                    this.detected[id]=CHAINSAW;
                                    collisionDetected=true;
                                    this.invulnerableFlag=true;
                                    if(actualHearts>0){
                                        actualHearts--;
                                    }
                                    else{
                                        this.waist.position.z+=1;
                                    }
                                    if(this.detectedLength<2){
                                        this.blink();
                                    }
                                    setTimeout(()=>{
                                        this.invulnerableFlag=false,
                                        console.log("not invulnerabile")
                                        ;}, 3100);
                                    console.log("invulnerabile")
                                return

                                case HEART:
                                    mesh.visible = false;
                                    this.detected[id]=HEART;
                                    if (this.waist.position.z>0){
                                        this.waist.position.z+=-1;
                                        totalHearts++;
                                    }
                                    else{
                                        actualHearts++;
                                        totalHearts++;
                                    }

                                break;

                                case STAR:
                                    mesh.visible = false;
                                    this.detected[id]=STAR;
                                    score++;
                                break;
                            }


                        }
                    }



                }


                for(let obj of objects[Left]){
                    obj.Update(timeElapsed);
                    this.player.updateCharacterBox();

                    let col=obj.getCollider();

                    if(col.intersectsBox(playerBox)){

                        let mesh=obj.getMesh();
                        let type=obj.getType();
                        let id=mesh.id;

                        if(!(id in this.detected)){
                            switch(type){
                                case CHAINSAW:
                                    this.detected[id]=CHAINSAW;
                                    collisionDetected=true;
                                    this.invulnerableFlag=true;
                                    if(actualHearts>0){
                                        actualHearts--;
                                    }
                                    else{
                                        this.waist.position.z+=1;
                                    }
                                    if(this.detectedLength<2){
                                        this.blink();
                                    }
                                    setTimeout(()=>{
                                        this.invulnerableFlag=false,
                                        console.log("not invulnerabile")
                                        ;}, 3100);
                                    console.log("invulnerabile")
                                return



                                case HEART:
                                    mesh.visible = false;
                                    this.detected[id]=HEART;
                                    if (this.waist.position.z>0){
                                        this.waist.position.z+=-1;
                                        totalHearts++;
                                    }
                                    else{
                                        actualHearts++;
                                        totalHearts++;
                                    }

                                break;

                                case STAR:
                                    mesh.visible = false;
                                    this.detected[id]=STAR;
                                    score++;
                                break;
                            }

                        }
                    }


                }



            }
        }
        

    }
};
