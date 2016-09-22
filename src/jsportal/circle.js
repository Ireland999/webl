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
    c.width = 300;
    c.height = 300;
    // console.log(11111)
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
    var torusData = torus(32, 32, 5.0, 0.0);
    var position = torusData[0];
    var color = torusData[1];
    var index = torusData[2];
      
    // 生成VBO  
    var position_vbo = create_vbo(position,gl);  
    var color_vbo = create_vbo(color,gl);  
    // 将VBO进行绑定并添加  
    set_attribute([position_vbo, color_vbo], attLocation, attStride,gl);  
    var ibo = create_ibo(index,gl);

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
      
    m.lookAt([0.0, 0.0, 20.0], [0, 0, 0], [0, 1, 0], vMatrix);
    m.perspective(45, c.width / c.height, 0.1, 100, pMatrix);
    m.multiply(pMatrix, vMatrix, tmpMatrix);

    var count = 0;
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);

    function draw (){
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        

        count++;
        

        var rad = (count % 360) * Math.PI / 180;
        

        m.identity(mMatrix);
        var positionLocation = gl.getUniformLocation(prg,"vColor");
        gl.uniform4f(positionLocation,0.0,1.0,0.0,1.0);
        // m.rotate(mMatrix, rad, [0, 1, 1], mMatrix);
        m.multiply(tmpMatrix, mMatrix, mvpMatrix);
        gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
        gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);

        gl.flush();

        // setTimeout(draw, 1000 / 30);
    }
    draw();
   
};
function torus(row, column, irad, orad){
    var pos = new Array(), col = new Array(), idx = new Array();
    for(var i = 0; i <= row; i++){
        var r = Math.PI * 2 / row * i;
        var rr = Math.cos(r);
        var ry = Math.sin(r);
        for(var ii = 0; ii <= column; ii++){
            var tr = Math.PI * 2 / column * ii;
            var tx = (rr * irad + orad) * Math.cos(tr);
            var ty = ry * irad;
            var tz = (rr * irad + orad) * Math.sin(tr);
            pos.push(tx, ty, tz);
            var tc = hsva(360 / column * ii, 1, 1, 1);
            col.push(tc[0], tc[1], tc[2], tc[3]);
        }
    }
    for(i = 0; i < row; i++){
        for(ii = 0; ii < column; ii++){
            r = (column + 1) * i + ii;
            idx.push(r, r + column + 1, r + 1);
            idx.push(r + column + 1, r + column + 2, r + 1);
        }
    }
    return [pos, col, idx];
}
function hsva(h, s, v, a){
    if(s > 1 || v > 1 || a > 1){return;}
    var th = h % 360;
    var i = Math.floor(th / 60);
    var f = th / 60 - i;
    var m = v * (1 - s);
    var n = v * (1 - s * f);
    var k = v * (1 - s * (1 - f));
    var color = new Array();
    if(!s > 0 && !s < 0){
        color.push(v, v, v, a); 
    } else {
        var r = new Array(v, n, m, m, k, v);
        var g = new Array(k, v, v, n, m, m);
        var b = new Array(m, m, k, v, v, n);
        color.push(r[i], g[i], b[i], a);
    }
    return color;
}

