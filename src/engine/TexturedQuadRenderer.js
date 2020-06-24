import Engine from "./Engine.js";
import ShadedQuadRenderer from "./ShadedQuadRenderer.js";

export default class TexturedQuadRenderer extends ShadedQuadRenderer{
    constructor(texture,s){
        super(null,null);
        this._texture=texture;
        this._s=s;
    }
    onInitialization(entity){
        this.setShader(Engine.getResource("BaseShader"));
        this.setTexture(this._texture);
        const aspect = this._texture.width / this._texture.height;
        const h = this._s;
        const w = aspect * h;
        this.setSize(createVector(w,h));

    }

    setTexture(tx){
        this.setUniform("Texture", tx);
    }
}
