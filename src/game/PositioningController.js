import Controller from "../engine/Controller.js";

export default class PositioningController extends Controller{
    constructor(){
        super();
        this._offset=createVector(0,0);
    }

    getOffset(){
        return this._offset;
    }
    setOffset(o){
        this._offset.set(o);
        console.log("Set",this._offset);
        return this;
    }

    onUpdate(entity,tpf){
        const pos=entity.getPosition();
        pos.set(this._offset);
        this.clamp(pos);

        entity.setPosition(pos);
    }

 
  }