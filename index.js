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
app.get('/addComment',loader.get('/addComment'));
app.get('/getRandomCode',loader.get('/getRandomCode'));
app.get('/queryCommentByBlogId',loader.get('/queryCommentByBlogId'));
app.get('/queryCommentCount',loader.get('/queryCommentCount'));
app.get('/queryAllBlog',loader.get('/queryAllBlog'));
app.get('/queryRandomTags',loader.get('/queryRandomTags'));
app.get('/queryHotBlog',loader.get('/queryHotBlog'));
app.get('/queryNewComments',loader.get('/queryNewComments'));
app.get('/queryByTag',loader.get('/queryByTag'));
app.get('/queryByTagCount',loader.get('/queryByTagCount'));
app.get('/queryAllViewsCount',loader.get('/queryAllViewsCount'));
app.get('/queryAllCommentsCount',loader.get('/queryAllCommentsCount'));
app.listen(globalConfig['port'],function(){
  console.log('服务器已启动')
})