const express = require('express');
const globalConfig = require('./config.js');
const loader = require('./loader.js');
const app = new express();
app.use(express.static(globalConfig['page_path']));
app.post('/editEveryDay',loader.get('/editEveryDay'));
app.get('/queryEveryDay',loader.get('/queryEveryDay'));
app.post('/editBlog',loader.get('/editBlog'));
app.get('/queryBlogPage',loader.get('/queryBlogPage'));
app.get('/queryCount',loader.get('/queryCount'));
app.get('/queryBlogById',loader.get('/queryBlogById'));
app.get('/addComment',loader.get('/addComment'))
app.get('/getRandomCode',loader.get('/getRandomCode'))
app.get('/queryCommentByBlogId',loader.get('/queryCommentByBlogId'));
app.get('/queryCommentCount',loader.get('/queryCommentCount'))
app.listen(globalConfig['port'],function(){
  console.log('服务器已启动')
})