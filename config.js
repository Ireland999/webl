module.exports = {
  babel:{presets:['es2015','stage-1']},
  entry:'src/jsportal/*.js',
  output:{
    port:3022,
    map:[
      {
        urlPath:'/static/js/',//服务路径
        filePath:'src'        //工程路径
      },
      {
        urlPath:'/staticpage/',
        filePath:'dist/staticpage/'
      }
    ]
  },
  watch:{
    path:'src',
    extension:['.js','.jsx'],
    ignored:/\/\.\w+/
  },
  log:{
    level:'info'
  }
}
