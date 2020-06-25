import Controller from "../engine/Controller.js";

export default class ScoreController extends Controller{
    constructor(guiItem){
        super();
        this._score=0;
        this._guiItem=guiItem;
    }
    getScore(){
        return this._score;
    }
    setScore(s){
        this._score=s;
    }
    incrementScore(){
        this._score++;
    }
    onUpdate(entity,tpf){
        if(this._guiItem){
            if(this._score!=this._lastScore){
                this._lastScore=this._score;
                let scoreDom=select("#"+this._guiItem);
                scoreDom.html(this._score);
            }
        }
    }
  }