function circleShader(){
  return `uniform vec2 uResolution;  
          vec2 center = vec2(uResolution.x/2., uResolution.y/2.);
          float radius = uResolution.x/2.;
          vec2 position = gl_FragCoord.xy - center;
          if (length(position) > radius) {
            gl_FragColor = vec4(vec3(0.), 1.);
          } else {
            gl_FragColor = vec4(vec3(1.), 1.);
          }`
}
export default circleShader;