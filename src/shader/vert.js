function Vert(){
  return `attribute vec3 vertexPos;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      void main() {
       // returns the position
      gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);
      }`
}
export default Vert;