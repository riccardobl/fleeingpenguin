import OnCollisionActionController from "./OnCollisionActionController.js";
import TexturedQuadRenderer from "../engine/TexturedQuadRenderer.js";
import Engine from "../engine/Engine.js";
import MotionController from "./MotionController.js";
import Entity from "../engine/Entity.js";
import Player from "./Player.js";
import PositioningController from "./PositioningController.js";
import SpawnSoundController from "./SpawnSoundController.js";
export default class Enemy extends Entity {
    static id = 0;
    constructor(at) {
        super("Enemy#"+(Enemy.id++),"pickup");
        const size=0.05;
        this.setRenderer(new TexturedQuadRenderer(
            Engine.getResource("monster.img"),
            size
        ));
        this.setCollisionRadius(0.01);
        this.setPosition(at);
        this.addController(new MotionController(createVector(-.2,0)));
        // this.addController(new SpawnSoundController(Engine.getResource("vanish.snd")));
        this.addController(new OnCollisionActionController(
            (self, b) => {
                const c=b.getController(PositioningController);
                if(c){
                    const off=c.getOffset();
                    off.x-=0.04;
                    c.setOffset(off);  
                    Engine.getResource("roar.snd").play();

                }
                    
                if(b.getCollisionRadius()>self.getCollisionRadius()){
                    self.destroy();
                    Engine.getResource("roar.snd").play();

                }
            }
        ));
    }

}