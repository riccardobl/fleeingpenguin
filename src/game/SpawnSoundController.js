import Engine from "../engine/Engine.js";
import Controller from "../engine/Controller.js";

export default class SpawnSoundController extends Controller {
    constructor(sound){
      super();
      this._spawned=false;
      this._sound=sound;
    }
    onUpdate(entity,tpf){   
      if( !  this._spawned){
        this._spawned=true;
        this._sound.play();
      }
    }
  }