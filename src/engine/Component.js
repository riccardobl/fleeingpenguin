
export default  class Component{
    constructor(){
        this._initialized=false;
        this._destructed=false;
        this._enabled=true;
    }
    _init(e){
        if(!this._initialized){
            this._initialized=true;
            this.onInitialization(e);
        }
    }
    _destroy(e){
        if(!this._destructed){
            this._destructed=true;
            this.onDestruction(e);
        }
    }
    isActive(){
        return this._initialized&&!this._destructed&&this._enabled;
    }
    setEnable(e){
        this._enabled=e;
    }
    onDestruction(entity){

    }
    onInitialization(entity){

    }
}
