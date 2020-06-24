import Controller from "./Controller.js"
export default class Entity {
    constructor(name,type){
        this._name=name;
        this._type=type;
        this._pos=createVector(0,0);
        this._isDead=false;
        this._cRadius=0;
        this._controllers=[];
        this._renderer=null;
        this.setCollisionRadius(0.);
    }     
    setRenderer(r){
        this._renderer=r;
    }
    getRenderer(){
        return this._renderer;
    }
    addController(x){
        console.assert(x instanceof Controller,x, "is not a controller!");
        this._controllers.push(x);
    }
    getController(claz){
        for(let i in this._controllers){
            if(this._controllers[i] instanceof claz){
                return this._controllers[i];
            }
        }
        return null;
    }
    removeController(x){
        for(let i=0;i<this._controllers.length;i++){
            if(this._controllers[i]==x){
                this._controllers.splice(i,1);
                break;
            }
        }
    }
    getType(){
        return this._type;
    }
    isDead(){
        return this._isDead;
    }
    destroy(){
        this._isDead=true;
        for(let i in this._controllers){
            const c=this._controllers[i];
            c._destroy(this);
        }
        this._renderer._destroy(this);
    }
    getCollisionRadius(){
        return this._cRadius;
    }
    setCollisionRadius(r){
        this._cRadius=r;
    }
    checkCollision(e2){
        let overridden=false;

        for(let i in this._controllers){
            const c=this._controllers[i]
            const res=c.overrideCollisionCheck(this,e2);
            if(typeof res!="undefined"){
                if(res){
                    this.collide(e2);
                    return;
                }
                overridden=true;
            }
        }

        if(overridden)return;
        const r1=this.getCollisionRadius();
        const r2=e2.getCollisionRadius();
        if(r1<=0||r2<=0)return;

        const p1=this.getPosition();
        const p2=e2.getPosition();
        const d=p1.dist(p2);
        if (d<r1+r2){
            this.collide(e2);
        }
    }
    setPosition(at) {
        this._pos.set(at);
    }
    getPosition() {
        return this._pos;
    }
    getName() {
        return this._name;
    }
    collide(e2){
        for(let i in this._controllers){
            const cc=this._controllers[i];
            if(cc.isActive())cc.onCollision(this,e2);
        }   
    }
    update(tpf) {
        for(let i in this._controllers){
            const c=this._controllers[i];
            c._init(this);
            if(c.isActive())c.onUpdate(this,tpf);
            
        }
    }
    render(cam,c,fb) {
        const cc=this._renderer;
        console.assert(fb);
        console.assert(typeof this._renderer!='undefined',"Renderer is undefined for ",this," set it to a valid renderer or null to disable rendering.");
        if(cc==null)return;

        cc._init(this);
        if(cc&&cc.isActive())cc.onRender(this,cam,c,fb);
        
    }

}






// class QuadEntity extends Entity {
//     constructor(name,type) {
//         super(name,type);
//         this._size = createVector(0.01, 0.01);
//         this._shader = null;
//         this._uniforms = {};
//         this._renderPos=createVector(0,0);
//         textureWrap(REPEAT,REPEAT);
//     }

//     setShader(shader) {
//         this._shader = shader;
//     }
//     setUniform(name, v) {
//         this._uniforms[name] = v;
//     }
//     setSize(size) {
//         this._size.set(size);
//     }
//     getSize() {
//         return this._size;
//     }        
//     render(cam,canvas) {
//         this._renderPos.set( this.getPosition());
//         let pos =  this._renderPos;
//         let size = this.getSize();
     
//         pos=pos.sub(cam.getPosition());
              
//         pos = cam.toPixels(pos);        
//         size = cam.toPixels(size);

//         size.div(2.);

//         push();
//         var gl = canvas.GL; 
//         gl.enable(gl.BLEND);

//         shader(this._shader);
//         noStroke();
//         for (let k in this._uniforms) {
//             let v = this._uniforms[k];
//             this._shader.setUniform(k, v);
//         }

//         translate(pos);
//         quad(
//             - size.x,  - size.y,
//              size.x, - size.y,
//             size.x,  size.y,
//             - size.x,  size.y
//         );
//         pop();

//         super.render(cam,canvas)
//     }
// }