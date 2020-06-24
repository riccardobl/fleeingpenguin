export default class Camera{    
    constructor(){
        this._pos=createVector(0,0);
        this._baseSize=createVector(640,480);
    }
    setPosition(v){
        this._pos.set(v);
    }
    getPosition(){
        return this._pos;
    }
    _getScale() {
        return max(width / this._baseSize.x, height / this._baseSize.y);
    }
    toPixels(v) {
        let x = v.x * this._baseSize.x;
        let y = v.y * this._baseSize.y;
        const r = this._getScale();
        x *= r;
        y *= r;
        return createVector(x, y);
    }

}
