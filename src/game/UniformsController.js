import Engine from "../engine/Engine.js";
import Controller from "../engine/Controller.js";

export default class UniformsController extends Controller {
    constructor(){
      super();
      this._time=0;
    }
    onUpdate(entity,tpf){   
      this._time+=tpf;
      const renderer=entity.getRenderer();
      if(renderer){
        renderer.setUniform("CamPos",[Engine.getCamera().getPosition().x,Engine.getCamera().getPosition().y]);
        renderer.setUniform("Time",this._time);
      }
    }
  }