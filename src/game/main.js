
import Camera from "../engine/Camera.js";
import Controller from "../engine/Controller.js";
import Engine from "../engine/Engine.js";
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
  Engine.setResource("magicspace.sound",   loadSound('assets/music/magicspace.wav'));
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
  if(!Surfaces.canvas){
    Surfaces.canvas=createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1);
  }
  resizeCanvas(windowWidth, windowHeight);

  // if(Surfaces.scene)Surfaces.scene.remove();
  // Surfaces.scene=createGraphics(w, h,WEBGL);
}

window.setup=function() { 
  frameRate(60);

   setAttributes('antialias', false);
  recreateSurfaces(windowWidth, windowHeight);


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
let enemyGenTimer=2;


window.draw=function() {


  // logic
  const t=(deltaTime/1000.);

  const camPos=Engine.getCamera().getPosition();
  camPos.x+=t*Settings.SPEED;
  Engine.getCamera().setPosition(camPos);


  const spawnX=Engine.getCamera().getPosition().x+.5;


  starGenTimer-=t;
  if(starGenTimer<0){
    starGenTimer=1.4;
    const star= new Star(createVector(spawnX,WORLD.getRandomY(spawnX)));
    Engine.addToWorld(star);
  }

  pickupGenTimer-=t;
  if(pickupGenTimer<0){
    pickupGenTimer=4.2;
    const boost= new Boost(createVector(spawnX,WORLD.getRandomY(spawnX)));
    Engine.addToWorld(boost);
  }

  enemyGenTimer-=t;
  if(enemyGenTimer<0){
    enemyGenTimer=0.8;
    const enemy=new Enemy(createVector(spawnX,WORLD.getRandomY(spawnX)));
    Engine.addToWorld(enemy);
  }

  //

  Engine.update();
  Engine.render(Surfaces.canvas,Surfaces.scene);

  // postprocessing


  // image(Surfaces.scene,-windowWidth/2,-windowHeight/2);

  const fpsDom=select("#fps");
  if(fpsDom)  fpsDom.html(frameRate().toFixed());
}


window.mousePressed=function() {
  userStartAudio();
}