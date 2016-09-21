// IBO的生成函数  
function create_ibo(data,gl){  
    // 生成缓存对象  
    var ibo = gl.createBuffer();  
      
    // 绑定缓存  
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);  
      
    // 向缓存中写入数据  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);  
      
    // 将缓存的绑定无效化  
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);  
      
    // 返回生成的IBO  
    return ibo;  
}  
export default create_ibo;