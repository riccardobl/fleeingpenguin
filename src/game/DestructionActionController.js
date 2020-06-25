import Engine from "../engine/Engine.js";
import Controller from "../engine/Controller.js";

export default class DestructionActionController extends Controller {
    constructor(action){
      super();
      this._action=action;

    }
    onDestruction(entity){
      this._action(entity);
    }
  }