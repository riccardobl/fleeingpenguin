import Controller from "../engine/Controller.js";

export default class OnCollisionActionController extends Controller{
    constructor(action){
        super();
        this._action=action;
    }
    onCollision(entityA,entityB){
          this._action(entityA,entityB);
    
    }
  }