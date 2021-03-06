import matix_shader from '../gl/matix-shader.js';
import ProgramManager from '../gl/program.js';
import create_vbo from '../gl/VBO.js';
import matIV from '../tool/minMatrix.js';

// Create the vertex data for a square to be drawn
function createSquare(gl) {
    var vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var verts = [
        .5, .5, 0.0, -.5, .5, 0.0,
        .5, -.5, 0.0, -.5, -.5, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts),
        gl.STATIC_DRAW);
    var square = {
        buffer: vertexBuffer,
        vertSize: 3,
        nVerts: 4,
        primtype: gl.TRIANGLE_STRIP
    };
    return square;
}

function draw(gl, obj) {

    // clear the background (with black)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // connect up the shader parameters: vertex position and projection/model matrices
    // look up where the attribute is in the vertex code, we essentially get an index number
    var vertexShader = matix_shader('vs',gl);
    var fragmentShader = matix_shader('fs',gl);
    // 程序对象的生成和连接
    var prg = ProgramManager(vertexShader, fragmentShader,gl);
    var shaderProjectionMatrixUniform = gl.getUniformLocation(prg, "projectionMatrix");
    var shaderModelViewMatrixUniform = gl.getUniformLocation(prg, "modelViewMatrix");
    var positionLocation = gl.getUniformLocation(prg,"vColor");
    var shaderVertexPositionAttribute = gl.getAttribLocation(prg, "vertexPos");
    gl.enableVertexAttribArray(shaderVertexPositionAttribute);

    var m = new matIV();   
    // 各种矩阵的生成和初始化  
    var projectionMatrix = m.identity(m.create());  
    var modelViewMatrix = m.identity(m.create());  
    gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);
    gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);
    gl.uniform4f(positionLocation,0.0,1.0,0.0,1.0);
    // draw it  - drawArrays(Mode,first,count)
    // start at index 0 with nVerts expected points
    gl.drawArrays(obj.primtype, 0, obj.nVerts);
}
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
window.onload = function() {
    var canvas = document.getElementById("container");
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    gl.viewport(0, 0, canvas.width, canvas.height);
    var obj = createSquare(gl);
    draw(gl, obj);
};