
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

        frameBuffer.push();
        
             // gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
        // gl.colorMask(true, true, true, false);
        frameBuffer.textureWrap(REPEAT,REPEAT);
        // frameBuffer.background(0,0,0,0);
        // pg.fill(255);
        frameBuffer.shader(this._shader);
        frameBuffer.noStroke();
        for (let k in this._uniforms) {
            let v = this._uniforms[k];
            this._shader.setUniform(k, v);
        }

        frameBuffer.translate(pos);
        frameBuffer.blendMode(BLEND);        
        frameBuffer.fill(0,0,0,0);

        frameBuffer.quad(
            - size.x,  - size.y,
             size.x, - size.y,
            size.x,  size.y,
            - size.x,  size.y
        );
        frameBuffer.pop();

    }
}
