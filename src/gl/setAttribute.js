// 绑定VBO相关的函数  
function set_attribute(vbo, attL, attS,gl){  
    // 处理从参数中得到的数组  
    for(var i in vbo){  
        // 绑定缓存  
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);  
          
        // 将attributeLocation设置为有效  
        gl.enableVertexAttribArray(attL[i]);  
          
        //通知并添加attributeLocation  
        gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);  
    }  
}  
export default set_attribute;