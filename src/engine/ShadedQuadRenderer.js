
import Renderer from "./Renderer.js";

export default class ShadedQuadRenderer extends Renderer {
    constructor(shader,size){
        super();
        this._renderPos=createVector(0,0);
        this._uniforms = {};
        this._shader = null;
        this._size = createVector(0.01, 0.01);
        if(shader){
            this.setShader(shader);
        }
        if(size){
            this.setSize(size);
        }

    }
   
    setShader(shader) {
        this._shader = shader;
    }
    getUniform(name){
        return this._uniforms[name];
    }
    setUniform(name, v) {
        this._uniforms[name] = v;
    }
    setSize(size) {
        this._size.set(size);
    }
    getSize() {
        return this._size;
    }        
    onRender(entity,cam,canvas,frameBuffer) {
        this._renderPos.set( entity.getPosition());
        let pos =  this._renderPos;
        let size = this.getSize();
     
        pos=pos.sub(cam.getPosition());
              
        pos = cam.toPixels(pos);        
        size = cam.toPixels(size);

        size.div(2.);

        push();
        
        textureWrap(REPEAT,REPEAT);

    
        shader(this._shader);
        noStroke();
        for (let k in this._uniforms) {
            let v = this._uniforms[k];
            this._shader.setUniform(k, v);
        }

        translate(pos);
        blendMode(BLEND);        
        fill(0,0,0,0);

        quad(
            - size.x,  - size.y,
             size.x, - size.y,
            size.x,  size.y,
            - size.x,  size.y
        );
        pop();
        // frameBuffer.push();
        

        // frameBuffer.textureWrap(REPEAT,REPEAT);
    
        // frameBuffer.shader(this._shader);
        // frameBuffer.noStroke();
        // for (let k in this._uniforms) {
        //     let v = this._uniforms[k];
        //     this._shader.setUniform(k, v);
        // }

        // frameBuffer.translate(pos);
        // frameBuffer.blendMode(BLEND);        
        // frameBuffer.fill(0,0,0,0);

        // frameBuffer.quad(
        //     - size.x,  - size.y,
        //      size.x, - size.y,
        //     size.x,  size.y,
        //     - size.x,  size.y
        // );
        // frameBuffer.pop();

    }
}
