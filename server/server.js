const Koa = require('koa');
const consola = require('consola');
const json = require('koa-json');
const path = require('path');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const router = require('./router/router');
const host = 'localhost';
const port = 5000;

const app = new Koa();
const staticPath = 'static/img';
console.log('path:' + path.join(__dirname, staticPath));
const imgsrc = koaStatic(path.join(__dirname, staticPath));

app.use(imgsrc);

function getRandomFileName (len, ext) {
  let str = 'abcdefghijklmnopqrstuvwxyz';
  let str1 = str.split('');
  let fileName = '';
  for (let i = 0; i < len; i ++) {
    let num = Math.floor(25 * Math.random());
    fileName += str1[num];
  }
  fileName += new Date().getTime();
  return fileName + '.' + ext;
}

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024,    // 设置上传文件大小最大限制，默认2M
    uploadDir: path.join(__dirname,'static/img/faces'),   //设置上传的目标目录
    keepExtensions: true,   //保持后缀名
    onFileBegin: (name,file) => {
      let ext = file.path.split('.');
      const dir = path.join(__dirname,'static/img/faces');
      const randomFile = getRandomFileName(10,ext[ext.length-1]);
      file.path = dir + '/' + randomFile;
    },
    onError: err => console.log(err)
  }
}));

app.use(json());
app.keys = ['im a newer secret', 'i like turtle'];

app.use(async (ctx, next) => {
  let origin = ctx.request.header.origin;
  ctx.set({
    'Access-Control-Allow-Origin': origin,
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Credentials': 'true'
  });
  ctx.acceptsCharsets('utf-8');
  await next();
});

app.use(router.routes()).use(router.allowedMethods())

app.listen(port,host);

consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true
});
