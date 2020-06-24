

import Camera from "./Camera.js"

export default class Engine {
    static root;
    static world=[];
    static _camera=null;
    static _resources=[];
    static setCamera(cam){
        this._camera=cam;
    }
    static getCamera(){
        if(!this._camera)this._camera=new Camera();
        return this._camera;
    }

    static getEntities(){
        return this.world;
    }

    static setResource(name,res){
        this._resources[name]=res;
    }

    static getResource(name){
        return this._resources[name];
    }

    static update() {
        const t = deltaTime / 1000.;
        for(let i in this.world)this.world[i].update(t);
        for(let i =0;i<this.world.length;i++){
            for(let j=0;j<this.world.length;j++){
                if(i==j)continue;
                this.world[i].checkCollision(this.world[j]);
            }
        }
        for(let i =0;i<this.world.length;i++){
            if(this.world[i].isDead()){
                this.removeFromWorldAt(i);
                i--;
            }  
        }
    }

    static render(canvas,fb) {
        for(let i in this.world)this.world[i].render(this.getCamera(),canvas,fb);
    }
    static addToWorld(e){
        this.world.push(e);
    }
    static removeFromWorldAt(i){
        this.world.splice(i,1);
    }

    static removeFromWorld(e){
        for(let i in this.world){
            if(this.world[i]==e)this.world.splice(i,1);
            break;
        }

    }

}


