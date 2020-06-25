import OnCollisionActionController from "./OnCollisionActionController.js";
import TexturedQuadRenderer from "../engine/TexturedQuadRenderer.js";
import Engine from "../engine/Engine.js";
import Entity from "../engine/Entity.js";
import Player from "./Player.js";
import PositioningController from "./PositioningController.js";

export default class Boost extends Entity {
    static id = 0;
    constructor(at) {
        super("Boost#"+(Boost.id++),"pickup");
        const size=0.02;

        this.setRenderer(new TexturedQuadRenderer(
            Engine.getResource("fireball.img"),
            size
        ));
        this.setCollisionRadius(size);
        this.setPosition(at);
        this.addController(new OnCollisionActionController(
            (self, b) => {
                const c=b.getController(PositioningController);
                if(c){
                    const off=c.getOffset();
                    off.x+=0.02;
                    c.setOffset(off);  
                    Engine.getResource("boost.snd").play();
              
                }                
                self.destroy();
            }
        ));
    }
}