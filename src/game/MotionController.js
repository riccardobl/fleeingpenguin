import Controller from "../engine/Controller.js";

export default class MotionController extends Controller{
    constructor(force){
        super();
        this._force=force;
        this._tmp=createVector(0,0);
    }
    onUpdate(entity,tpf){
        if(typeof this._force==='function')this._tmp.set(this._force(entity,this._tmp));
        else this._tmp.set(this._force);
        this._tmp.mult(tpf);
        const p=entity.getPosition();
        p.add(this._tmp)
        this.clamp(p);

        entity.setPosition(p);     
    }
    setClamp(minX,maxX,minY,maxY){
        this._clampMinX=minX;
        this._clampMaxX=maxX;
        this._clampMinY=minY;
        this._clampMaxY=maxY;
        return this;
    }
    clamp(pos){
        if(this._clampMinX){
            if(pos.x<this._clampMinX)pos.x=this._clampMinX;
        }
        if(this._clampMaxX){
            if(pos.x>this._clampMaxX)pos.x=this._clampMaxX;
        }
        
        if(this._clampMinY){
            if(pos.y<this._clampMinY)pos.y=this._clampMinY;
        }
        if(this._clampMaxY){
            if(pos.y>this._clampMaxY)pos.y=this._clampMaxY;
        }
        
   
    }
  }