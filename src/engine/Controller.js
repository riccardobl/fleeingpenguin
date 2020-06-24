import Component from "./Component.js";

export default class Controller extends Component{
    constructor(){
        super();
   
    }
    onUpdate(entity,tpf){

    }
    onCollision(entity,tpf){

    }
    overrideCollisionCheck(entityA,entityB){
        return undefined;
    }

}
