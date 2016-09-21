// 程序对象的生成和着色器连接的函数
function ProgramManager(vs, fs,gl){
    // 程序对象的生成
    var program = gl.createProgram();
    
    // 向程序对象里分配着色器
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    
    // 将着色器连接
    gl.linkProgram(program);
    
    // 判断着色器的连接是否成功
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
    
        // 成功的话，将程序对象设置为有效
        gl.useProgram(program);
        
        // 返回程序对象
        return program;
    }else{
        // console.log(gl.getProgramInfoLog(program))
        // 如果失败，弹出错误信息
        alert(gl.getProgramInfoLog(program));
    }
}
export default ProgramManager;