const express = require('express');
const app = express();

app.get('/', (req, res) => {
  //写完一个send，后面所有跟路由有关的都不会执行
  //会自动响应对应的数据类型
  //   res.send([1, 2, 3]);
  //   res.send({ ok: 1 });
  res.send(`
        <html>
            <h1>hello world</h2>
        </html>
    `);
});

// 占位符
app.get('/ab/:listId/:id', (req, res) => {
  res.send('ab');
});

// 正则
app.get(/.*fly$/, (req, res) => {
  res.send('fly');
});

const fun1 = (req, res, next) => {
  // 验证用户token过期, cookie过期
  console.log('token验证');
  let isValid = true;
  if (isValid) {
    next();
  } else {
    res.send('error');
  }
};
const fun2 = (req, res) => {
  res.send('home');
};
app.get('/home', [fun1, fun2]);

app.get('/list', fun1, (req, res) => {
  res.send('list');
});
app.listen(8888, () => console.log(`Example app listening on port!`));
