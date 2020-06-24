import ShadedQuadRenderer from "../engine/ShadedQuadRenderer.js";
import Engine from "../engine/Engine.js";
import UniformsController from "./UniformsController.js";
import FollowCameraController from "./FollowCameraController.js";
import Entity from "../engine/Entity.js";
import Controller from "../engine/Controller.js";
import Player from "./Player.js";
import DestroyOnTouchController from "./DestroyOnTouchController.js";


class WorldCollider extends Controller {
    constructor(renderer) {
        super();
        this._renderer = renderer;
    }
    getRenderer() {
        return this._renderer;
    }
    texture2D(img, coords) {
        let yp;
        let xp;
        if (coords instanceof p5.Vector) {
            xp = coods.x;
            yp = coords.y;
        } else {
            xp = coords[0];
            yp = coords[1];
        }
        xp = fract(xp);
        yp = fract(yp);
        yp *= img.height;
        xp *= img.width;
        const rect = img.get(xp, yp);
        console.assert(rect);


        const out = [0., 0., 0., 0.];

        out[0] = rect[0] / 255.;
        out[1] = rect[1] / 255.;
        out[2] = rect[2] / 255.;
        out[3] = rect[3] / 255.;


        return out;
    }
    getTerrainY(TexCoord) {
        ///
        const Noise = this.getRenderer().getUniform("Noise");
        const mix = lerp;
        //
        const speed = this.getRenderer().getUniform("Speed");
        const t = this.getRenderer().getUniform("Time") * speed;
        const sinStr = this.getRenderer().getUniform("SinWaveStrength");
        const basicTerrainHeight = this.getRenderer().getUniform("BasicTerrainHeight");
        const WorldX = this.getRenderer().getUniform("CamPos")[0];
        const maxTerrainH = this.getRenderer().getUniform("MaxTerrainH");

        let samplePos = [TexCoord.x + WorldX, TexCoord.x + WorldX]
        let noise = this.texture2D(Noise, samplePos)[0] + sin(TexCoord.x + WorldX) * sinStr;

        let samplePos2 = [TexCoord.x * 2. + t, TexCoord.x * 2. + t];

        let melting = this.texture2D(Noise, samplePos2)[0];
        noise -= mix(0., melting, pow(1. - TexCoord.x, 6.));

        let terrainY = abs(noise * maxTerrainH) + basicTerrainHeight;
        return terrainY;
    }
    getTerrainYAtWorldC(coord) {
        if (!this._tx) this._tx = createVector(0, 0);
        this._tx.set(coord);
        this._tx.sub(Engine.getCamera().getPosition().x - 0.5);
        return this.getTerrainY(this._tx);
    }
    overrideCollisionCheck(e1, e2) {
        const r2 = e2.getCollisionRadius();
        if (r2 <= 0) return;
        const p2 = e2.getPosition();
        if(p2.x<e1.getPosition().x-0.3)return true;
        const terrainY = this.getTerrainYAtWorldC(p2);
        const entityY = 1. - (p2.y + .5);
        return entityY < terrainY;
    }
}

export default class World extends Entity {
    constructor() {
        super("World", "world");
        this.setRenderer(new ShadedQuadRenderer(
            Engine.getResource("WorldShader"),
            createVector(1, 1)
        ));

        this.getRenderer().setUniform("SinWaveStrength", 0.3);
        this.getRenderer().setUniform("Speed", 0.3);
        this.getRenderer().setUniform("BasicTerrainHeight", 0.2);
        this.getRenderer().setUniform("Noise", Engine.getResource("noise-x3-512"));
        this.getRenderer().setUniform("MaxTerrainH", 0.2);

        this.addController(new UniformsController());
        this.addController(new WorldCollider(this.getRenderer()));
        this.addController(new DestroyOnTouchController());
    }
    getRandomY(spawnX) {
        const wc = this.getController(WorldCollider);
        const terrainH = (wc.getTerrainYAtWorldC(createVector(spawnX, 1.))) - .5;
        let r = Math.random() * (.5 - terrainH) + terrainH;
        return r;
    }
   

}

