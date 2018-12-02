const Router = require('koa-router');
const Redis = require('redis');
const fs = require('fs');
const path = require('path');
const {User, Book} = require('../model/Model.js');
const crypto = require('crypto-js');
const redis = Redis.createClient(6379,'localhost',{});
const adminCode = require('../pass/admin.js');
const Op = require('sequelize').Op;

const router = new Router();

router.post('/register', async ctx => {
  const user =ctx.request.body;
  console.log(adminCode.authentication.indexOf(user.radminCode))
  try {
    let result = await User.create({
      username: user.rusername,
      password: user.rpassword,
      email: user.remail,
      name: '请输入',
      phone: '请输入',
      school: '请输入',
      work: '请输入',
      description: '请输入',
      avatar: '请上传',
      adminCode: adminCode.authentication.indexOf(user.radminCode) !== -1 ? user.radminCode : '0'
    });
    ctx.body = {
      code: result !== null ? 0 : -1,
      msg: result !== null ? '注册成功' : '注册失败'
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
});

router.post('/login', async (ctx, next) => {
  const user = ctx.request.body;
  let result = await User.findOne({
    where: {
      username: user.username,
      password: user.password
    }
  });
  if (result !== null && result !== undefined) {
    const key = crypto.MD5(user.username).toString();
    redis.set(`user:${key}`,`${user.username}`);
    ctx.cookies.set('usrpwd', key, {
      signed: true,
      path: '/',
      httpOnly: true,
      hostOnly: true,
      secure: false
    });
    ctx.body = {
      code: 0,
      msg: '登录成功',
      user: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '登录失败'
    }
  }
});

router.get('/logout', async ctx => {
  let username = ctx.cookies.get(`usrpwd`, {signed: true});
  ctx.cookies.set('usrpwd','',{
    signed: true,
    path: '/',
    httpOnly: true,
    hostOnly: true,
    secure: false,
    maxAge: 0
  })
  ctx.body = {
    code: 0,
    msg: '注销成功'
  }
});

router.get('/getUser', async ctx => {
  let username = ctx.cookies.get(`usrpwd`, {signed: true});
  let isLogin = await redis.exists(`user:${username}`);
  if (isLogin) {
    function f () {
      return new Promise((resolve, reject) => {
        redis.get(`user:${username}`, async (err, response) => {
          if (err == null) {
            resolve(response);
          }
        });
      });
    }
    let result = await f();
    let user = await User.findOne({
      where: {
        username: result
      }
    });
    if (user !== null && user!== undefined) {
      ctx.body = {
        code: 0,
        user
      }
    } else {
      ctx.body = {
        code: -1,
        user: null
      }
    }
  } else {
    ctx.body = {
      code: -1,
      user: null
    }
  }
});

router.post('/updateUser', async ctx => {
  const user = ctx.request.body;
  let user1 = await User.findOne({
    where: {
      username: user.username
    }
  });
  if (user1 !== null && user1 !== undefined) {
    user1.password = user.password;
    user1.phone = user.phone;
    user1.email = user.email;
    user1.school = user.school;
    user1.work = user.work;
    user1.description = user.description;
    user1.name = user.name;
    let result = await user1.save();
    if (result !== null && result !== undefined) {
      ctx.body = {
        code: 0,
        msg: '修改成功',
        user1
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '修改失败'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '修改失败'
    }
  }
});

router.post('/uploadAvatar', async ctx => {
  let path = ctx.request.files.avatar.path.split('/');
  let name = path[path.length-1];
  name = 'faces/' + name;
  let username = ctx.request.body.username;
  let user = await User.findOne({
    where: {
      username: username
    }
  });
  if (user !== undefined && user!== null) {
    user.avatar = name;
    let result = await user.save();
    if (result !== null && result !== undefined) {
      return ctx.body = {
        code: 0,
        msg: '上传成功',
        avatarName: name
      }
    } else {
      return ctx.body = {
        code: -1,
        msg: '上传失败'
      }
    }
  } else {
    return ctx.body = {
      code: 0,
      msg: '上传失败'
    }
  }
});

router.get('/getAllBooks', async ctx => {
  let books = await Book.findAll();
  ctx.body = {
    code: books !== null && books !== undefined ? 0 : 1,
    books: books !== null && books !== undefined ? books : null
  }
});

router.post('/createBook', async ctx => {
  const book = ctx.request.body;
  let book1 = Book.create({
    ISBN: book.ISBN,
    name: book.name,
    author: book.author,
    description: book.description,
    count: 100
  });
  if (book1 !== null && book1 !== undefined) {
    ctx.body = {
      code: 0,
      msg: '添加图书成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '添加图书失败'
    }
  }
});

router.post('/updateBook', async ctx => {
  const book = ctx.request.body;
  let book1 = await Book.findOne({
    where: {
      ISBN: book.ISBN
    }
  });
  if (book1 !== null && book1 !== undefined) {
    book1.ISBN = book.ISBN;
    book1.name = book.name;
    book1.author = book.author;
    book1.description = book.description;
    let result = await book1.save();
    if (result !== null && result !== undefined) {
      ctx.body = {
        code: 0,
        msg: '修改成功'
      }
    } else {
        ctx.body = {
          code: -1,
          msg: '修改失败'
        }
      }
    } else {
    ctx.body = {
      code: -1,
      msg: '修改失败'
    }
  }
});

router.post('/deleteBook', async ctx => {
  const book = ctx.request.body;
  let book1 = await Book.destroy({
      where: {
        ISBN: book.ISBN
      }
    });
  if (book1 !== null || book1 !== undefined) {
      ctx.body = {
        code: 0,
        msg: '删除成功'
      }
    } else {
    ctx.body = {
      code: -1,
      msg: '删除失败'
    }
  }
});

router.post('/searchBook', async ctx => {
  let keyword = ctx.request.body.keyword;
  let type = ctx.request.body.type;
  let condition = {};
  condition[type] = {
    [Op.like]: '%'+keyword+'%'
  };
  console.log(condition);
  let books = await Book.findAll({
    where: condition
  });
  if (books !== null && books !== undefined) {
    ctx.body = {
      code: 0,
      msg: '查找成功',
      books
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '查找失败',
      books: null
    }
  }
});

module.exports = router;
