import OnCollisionActionController from "./OnCollisionActionController.js";
import TexturedQuadRenderer from "../engine/TexturedQuadRenderer.js";
import Engine from "../engine/Engine.js";
import UniformsController from "./UniformsController.js";
import Entity from "../engine/Entity.js";
import Controller from "../engine/Controller.js";
import Player from "./Player.js";
import ScoreController from "./ScoreController.js";

export default class Star extends Entity {
    static id = 0;
    constructor(at) {
        super("Star#" + (Star.id++), "pickup");
        this.setRenderer(new TexturedQuadRenderer(
            Engine.getResource("star.img"),
            0.01
        ));
        this.setCollisionRadius(0.01);
        this.setPosition(at);
        this.addController(new OnCollisionActionController(
            (self, b) => {
                const scoreC=b.getController(ScoreController);
                if(scoreC){
                    Engine.getResource("pickup.snd").play();
                    scoreC.incrementScore();                
                }else{
                    Engine.getResource("vanish.snd").play();

                }
                self.destroy();
            }
        ));
    }
}