import create_shader from '../gl/shader';
import ProgramManager from '../gl/program.js';
import matIV from '../tool/minMatrix.js';
import create_vbo from '../gl/VBO.js';
import set_attribute from '../gl/setAttribute.js';
import create_ibo from '../gl/IBO.js';
window.onload = init; 
function init(){
  console.log('init')
    // canvas对象获取
    var c = document.getElementById('canvas');
    c.width = 500;
    c.height = 300;
    var save = document.getElementById('saveImg');
    
    // webgl的context获取
    var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    save.addEventListener('click',function(){
        console.log(gl.getImageData(),'c的属性')
        /* var image = c.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
         console.log(image,'image');
         window.location.href=image; // it will save locally*/
    });
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
        0.0,  1.0,  0.0,  
        1.0,  0.0,  0.0,  
        -1.0,  0.0,  0.0,  
        0.0, -1.0,  0.0  
    ];  
  
    // 保存顶点的颜色情报的数组  
    var vertex_color = [  
        1.0, 0.0, 0.0, 1.0,  
        0.0, 1.0, 0.0, 1.0,  
        0.0, 0.0, 1.0, 1.0,  
        1.0, 1.0, 1.0, 1.0  
    ];  
     // 保存顶点的索引的数组  
    var index = [  
        0, 1, 2,  
        1, 2, 3  
    ]; 
    // 生成VBO  
    var position_vbo = create_vbo(vertex_position,gl);  
    var color_vbo = create_vbo(vertex_color,gl);  
    // 将VBO进行绑定并添加  
    set_attribute([position_vbo, color_vbo], attLocation, attStride,gl);   
    // 生成IBO  
    var ibo = create_ibo(index,gl);  
      
    // IBO进行绑定并添加  
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);   
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
    m.lookAt([0.0, 0.0, 5.0], [0, 0, 0], [0, 1, 0], vMatrix);  
    
    // 投影坐标变换矩阵  
    m.perspective(45, c.width / c.height, 0.1, 100, pMatrix);  
    m.multiply(pMatrix, vMatrix, tmpMatrix);  

    var count = 0;

    function draw (){
        // canvasを初期化  
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  
        gl.clearDepth(1.0);  
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
          
        // 计数器递增  
        count++;  
          
        // 使用计数器算出角度   
        var rad = (count % 360) * Math.PI / 180;  
          
        // 模型坐标变换矩阵的生成(沿着Y轴旋转)  
        m.identity(mMatrix);  
        m.rotate(mMatrix, rad, [0, 1, 0], mMatrix);  
        m.multiply(tmpMatrix, mMatrix, mvpMatrix);  
        gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);  
          
        // 使用索引进行绘图  
        gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);  
          
        // context刷新  
        gl.flush();  

        setTimeout(draw, 1000 / 30);
    }
    draw();
   
};


