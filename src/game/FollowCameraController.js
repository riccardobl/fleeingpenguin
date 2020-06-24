import Engine from "../engine/Engine.js";
import PositioningController from "./PositioningController.js";

export default class FollowCameraController extends PositioningController{
    constructor(strength){
      super();
        this._s=createVector(1.,1.);
        if(typeof  strength != "undefined" )this._s.set(strength);
    }
    setStrength(s){
        this._s.set(s);

    }

    onUpdate(entity,tpf){   
        const p=entity.getPosition();
        const camp=Engine.getCamera().getPosition();
        p.x=lerp(p.x,camp.x,this._s.x);
        p.y=lerp(p.y,camp.y,this._s.y);
        p.add(this.getOffset());

        entity.setPosition(p);
    }
  }
  