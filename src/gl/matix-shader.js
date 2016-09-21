import Fragment from '../shader/fragment.js';
import Vert from '../shader/vert.js';
// 生成着色器的函数
function matix_shader(id,gl){
    var txt = '';
    // 用来保存着色器的变量
    var shader;
    if(id == 'vs'){
        shader = gl.createShader(gl.VERTEX_SHADER);
        txt = Vert();
    }else if(id == 'fs'){
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        txt = Fragment();
    }
    // 将标签中的代码分配给生成的着色器
    gl.shaderSource(shader, txt);
    
    // 编译着色器
    gl.compileShader(shader);
    
    // 判断一下着色器是否编译成功
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        
        // 编译成功，则返回着色器
        return shader;
    }else{
        console.log(gl.getShaderInfoLog(shader))
        // 编译失败，弹出错误消息
        alert(gl.getShaderInfoLog(shader));
    }
}
export default matix_shader;