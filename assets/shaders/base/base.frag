// webgl requires that the first line of the fragment shader specify the precision
// precision is dependent on device, but higher precision variables have more zeros
// sometimes you'll see bugs if you use lowp so stick to mediump or highp
precision mediump float;

varying vec2 TexCoord; 
uniform sampler2D Texture;
void main() {


  gl_FragColor = texture2D(Texture,TexCoord);
  // gl_FragColor.a=1.;
}