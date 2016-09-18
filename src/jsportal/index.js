import create_shader from '../gl/shader';
import ProgramManager from '../gl/program.js';
import matIV from '../tool/minMatrix.js';
import create_vbo from '../gl/VBO.js';
import set_attribute from '../gl/setAttribute.js';
window.onload = init; 
function init(){
  console.log('init')
    // canvas对象获取
    var c = document.getElementById('canvas');
    c.width = 300;
    c.height = 300;

    // webgl的context获取
    var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    // 顶点着色器和片段着色器的生成
    var v_shader = create_shader('vs',gl);
    var f_shader = create_shader('fs',gl);
    
    // 程序对象的生成和连接
    var prg = ProgramManager(v_shader, f_shader,gl);
    
    // attributeLocation的获取  
    var attLocation = new Array(2);  
    attLocation[0] = gl.getAttribLocation(prg, 'position');  
    attLocation[1] = gl.getAttribLocation(prg, 'color');  
      
    // 将元素数attribute保存到数组中  
    var attStride = new Array(2);  
    attStride[0] = 3;  
    attStride[1] = 4;  
  
    // 保存顶点的位置情报的数组  
    var vertex_position = [  
         0.0, 1.0, 0.0,  
        1.0, 0.0, 0.0,  
        -1.0, 0.0, 0.0  
    ];  
  
    // 保存顶点的颜色情报的数组  
    var vertex_color = [  
        1.0, 0.0, 0.0, 1.0,  
        0.0, 1.0, 0.0, 1.0,  
        0.0, 0.0, 1.0, 1.0  
    ];  
      
    // 生成VBO  
    var position_vbo = create_vbo(vertex_position,gl);  
    var color_vbo = create_vbo(vertex_color,gl);  
    // 将VBO进行绑定并添加  
    set_attribute([position_vbo, color_vbo], attLocation, attStride,gl);    
    // uniformLocation的获取  
    var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');      
    // 使用minMatrix.js对矩阵的相关处理  
    // matIV对象生成  
    var m = new matIV();  
      
    // 各种矩阵的生成和初始化  
    var mMatrix = m.identity(m.create());  
    var vMatrix = m.identity(m.create());  
    var pMatrix = m.identity(m.create());  
    var tmpMatrix = m.identity(m.create());  
    var mvpMatrix = m.identity(m.create());  
      
    // 视图变换坐标矩阵  
    m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);  
    
    // 投影坐标变换矩阵  
    m.perspective(90, c.width / c.height, 0.1, 100, pMatrix);  
    m.multiply(pMatrix, vMatrix, tmpMatrix);  

    var count = 0;

    function draw (){
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        count++;

        var rad = (count % 360) * Math.PI / 180;

        var x = Math.cos(rad);
        var y = Math.sin(rad);
        m.identity(mMatrix);
        m.translate(mMatrix, [x, y + 1.0, 0.0], mMatrix);
        

        m.multiply(tmpMatrix, mMatrix, mvpMatrix);
        gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        m.identity(mMatrix);
        m.translate(mMatrix, [1.0, -1.0, 0.0], mMatrix);
        m.rotate(mMatrix, rad, [0, 1, 0], mMatrix);

        m.multiply(tmpMatrix, mMatrix, mvpMatrix);
        gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        var s = Math.sin(rad) + 1.0;
        m.identity(mMatrix);
        m.translate(mMatrix, [-1.0, -1.0, 0.0], mMatrix);
        m.scale(mMatrix, [s, s, 0.0], mMatrix)

        m.multiply(tmpMatrix, mMatrix, mvpMatrix);
        gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.flush();

        setTimeout(draw, 1000 / 30);
    }
    draw();
   
};


