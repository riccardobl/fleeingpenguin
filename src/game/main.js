
import Camera from "../engine/Camera.js";
import Controller from "../engine/Controller.js";
import ShadedQuadRenderer from "../engine/ShadedQuadRenderer.js";
import TexturedQuadRenderer from "../engine/TexturedQuadRenderer.js";
import Renderer from "../engine/Renderer.js";
import Entity from "../engine/Entity.js";
import Engine from "../engine/Engine.js";
import UniformsController from "./UniformsController.js";
import FollowCameraController from "./FollowCameraController.js";
import World from "./World.js";
import Player from "./Player.js";
import Star from "./Star.js";
import Enemy from "./Enemy.js";
import Boost from "./Boost.js";
import ScoreController from "./ScoreController.js";
import MotionController from "./MotionController.js";

const Settings={
  SPEED:0.1
}


window.preload=function() {
  Engine.setResource("penguin1",loadImage("assets/imgs/penguin1.png"));
  Engine.setResource("penguin2",loadImage("assets/imgs/penguin2.png"));
  Engine.setResource("BaseShader",loadShader("assets/shaders/base/base.vert", "assets/shaders/base/base.frag"));
  Engine.setResource("WorldShader", loadShader("assets/shaders/world/world.vert", "assets/shaders/world/world.frag"));
  Engine.setResource("noise-x3-512",  loadImage("assets/imgs/noise-x3-512.png"));
  Engine.setResource("magicspace.sound",   loadSound('assets/music/magicspace.ogg'));
  Engine.setResource("star.img", loadImage("assets/imgs/star.png"));
  Engine.setResource("monster.img", loadImage("assets/imgs/monster.png"));
  Engine.setResource("fireball.img", loadImage("assets/imgs/fireball.png"));
  Engine.setResource("pickup.snd", loadSound("assets/sounds/pickup.wav"));
  Engine.setResource("vanish.snd", loadSound("assets/sounds/vanish.wav"));
  Engine.setResource("roar.snd", loadSound("assets/sounds/roar.wav"));
  Engine.setResource("damage.snd",loadSound("assets/sounds/launch.wav"));
  Engine.setResource("boost.snd",loadSound("assets/sounds/launch.wav"));

}



const Surfaces={
  canvas:null,
  scene:null
}

let WORLD;
let PLAYER;


function recreateSurfaces(w,h){
  if(!Surfaces.canvas)Surfaces.canvas=createCanvas(windowWidth, windowHeight, WEBGL);
  resizeCanvas(windowWidth, windowHeight);

  // if(Surfaces.scene)Surfaces.scene.remove();
  // Surfaces.scene=createGraphics(w, h,WEBGL);
}

window.setup=function() { 
  getAudioContext().suspend();

   setAttributes('antialias', true);
    recreateSurfaces(windowWidth, windowHeight);

  // SCENE=createGraphics(windowWidth, windowHeight,WEBGL);

  Engine.getResource("magicspace.sound").loop();

  WORLD= new World();
  WORLD.addController(new FollowCameraController());

  Engine.addToWorld(WORLD);
  
  PLAYER = new Player();
  PLAYER.addController(new FollowCameraController(createVector(1.,0.))
  );
  PLAYER.addController(new ScoreController("score"));
  PLAYER.addController(new MotionController(
    (entity,f)=>{
      let my=(mouseY/height)-.5;
      let ey=entity.getPosition().y
      f.y=my-ey;
      const s=0.1;
      if(f.y>s)f.y=s;
      else if(f.y<-s)f.y=-s;
      
      return f;

    }
  )  .setClamp(null,null,-.3,.3)
  );
  Engine.addToWorld(PLAYER);
}

window.windowResized=function() {
  recreateSurfaces(windowWidth,windowHeight);
  
}

let starGenTimer=1;
let pickupGenTimer=1;
let pickups=[];
let enemyGenTimer=2;
function gameLogic(){
  const t=(deltaTime/1000.);

  const camPos=Engine.getCamera().getPosition();
  camPos.x+=t*Settings.SPEED;
  Engine.getCamera().setPosition(camPos);


  const spawnX=Engine.getCamera().getPosition().x+.5;
  starGenTimer-=t;
  if(starGenTimer<0){
    starGenTimer=1.4;
    // starGenTimer=0;
    const star= new Star(createVector(spawnX,WORLD.getRandomY(spawnX)));
    Engine.addToWorld(star);
    pickups.push(star);

  }
  pickupGenTimer-=t;

  if(pickupGenTimer<0){
    pickupGenTimer=4.2;
    // starGenTimer=0;
    const pickup= new Boost(createVector(spawnX,WORLD.getRandomY(spawnX)));
    Engine.addToWorld(pickup);

    pickups.push(pickup);

  }

  enemyGenTimer-=t;
  if(enemyGenTimer<0){
    enemyGenTimer=0.8;
    const enemy=new Enemy(createVector(spawnX,WORLD.getRandomY(spawnX)));
    Engine.addToWorld(enemy);

  }

 

}

window.draw=function() {
  // background(0);
  gameLogic();
  Engine.update();
  // console.assert(CANVAS);
  // console.assert(SCENE);

  Engine.render(Surfaces.canvas,Surfaces.scene);

  // postprocessing


  // image(Surfaces.scene,-windowWidth/2,-windowHeight/2);


}


window.mousePressed=function() {
  userStartAudio();
}