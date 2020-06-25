precision mediump float;

varying vec2 TexCoord; 
uniform sampler2D Texture;
uniform sampler2D Noise;

uniform float Time;
uniform vec2 CamPos;
uniform float SinWaveStrength;
uniform float Speed;
uniform float BasicTerrainHeight;
uniform float MaxTerrainH;

void main() {
  float speed=Speed;
  float t=Time*speed;
  float sinStr=SinWaveStrength;
  float basicTerrainHeight=BasicTerrainHeight;
  float WorldX=CamPos.x;
  float maxTerrainH=MaxTerrainH;

  vec2 samplePos=vec2(TexCoord.x+WorldX );

  vec3 noiseRgb=texture2D(Noise,samplePos).rgb;

  float noise=noiseRgb.r+sin(TexCoord.x+WorldX)*sinStr;
  
  vec2 samplePos2=vec2(TexCoord.x*2.+t );

  float melting= texture2D(Noise,samplePos2).r;
  float meltingFactor=pow(1.-TexCoord.x,6.);
  noise-=mix(0.,melting,meltingFactor);

  float terrainY=abs(noise*maxTerrainH)+basicTerrainHeight;
 
  float y=1.-TexCoord.y;
  float x=TexCoord.x;
  vec3 skyColor1=vec3(0, 27, 107)/255.;
  vec3 skyColor2=vec3(173, 183, 255)/255.;
  
  gl_FragColor.rgb=mix(skyColor1,skyColor2,sin((TexCoord.x+TexCoord.y)+WorldX));
  gl_FragColor.a=1.;
  float h=terrainY;
  if(y<h){
    
    vec3 color=noiseRgb;
    color.r+=meltingFactor*2.;
    vec3 iceColor=vec3(230, 238, 255)/255.;
    gl_FragColor.rgb= mix(iceColor,color,meltingFactor+0.15);
 
    
  }

  //. global warming
  {
    vec4 fire=vec4(255., 72., 0.,255.)/255.;
    fire*=2.2;
    float blend=meltingFactor;
    vec3 dist=texture2D(Noise,TexCoord*-2.+Time).rgb;

    blend*=dist.x+dist.y;
    blend=clamp(0.,1.,blend);
    gl_FragColor=mix(gl_FragColor,fire,blend);
  }
}
