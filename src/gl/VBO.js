// 生成VBO的函数
function create_vbo(data,gl){
   // 生成缓存对象  
    var vbo = gl.createBuffer();  
      
    // 绑定缓存  
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);  
      
    // 向缓存中写入数据  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);  
      
    // 将绑定的缓存设为无效  
    gl.bindBuffer(gl.ARRAY_BUFFER, null);  
      
    // 返回生成的VBO  
    return vbo;  
}
export default create_vbo;