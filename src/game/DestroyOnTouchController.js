import Engine from "../engine/Engine.js";
import Controller from "../engine/Controller.js";

export default class DestroyOnTouchController extends Controller {
    constructor(){
      super();

    }
    onCollision(e1,e2){   
      e2.destroy();
    }
  }