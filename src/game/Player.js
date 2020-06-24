import TexturedQuadRenderer from "../engine/TexturedQuadRenderer.js";
import Engine from "../engine/Engine.js";
import FollowCameraController from "./FollowCameraController.js";
import Entity from "../engine/Entity.js";
import Controller from "../engine/Controller.js";
import UniformsController from "./UniformsController.js";
import OnCollisionActionController from "./OnCollisionActionController.js";
import Star from "./Star.js";
import Boost from "./Boost.js";
import Enemy from "./Enemy.js";


class PlayerFlapAction extends Controller {
    onUpdate(entity, tpf) {
        if (!this._time) this._time = 0;
        this._time += tpf;
        if (this._time >= .3) {
            this._time = 0;
            this.switch = !this.switch;
            if (this.switch) {
                entity.getRenderer().setTexture(Engine.getResource("penguin1"));
            } else {
                entity.getRenderer().setTexture(Engine.getResource("penguin2"));
            }
        }
    }
}


export default class Player extends Entity {
    constructor() {
        super("Player", "player");

        this.setPosition(createVector(0., 0.));
        this.setCollisionRadius(0.03);

        this.setRenderer(new TexturedQuadRenderer(
            Engine.getResource("penguin1"),
            0.03
        ));
        this.addController(new UniformsController());
        this.addController(new PlayerFlapAction());
        
    }
}

