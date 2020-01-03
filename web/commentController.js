const commentDao = require('../dao/commentDao.js');
const timeUtil = require('../util/timeUtil.js');
const getResp = require('../util/respUtil.js');
const tagsDao = require('../dao/tagsDao.js');
const insertTagBlogMapping = require('../dao/tagBlogMapping.js');
const captcha = require('svg-captcha');
const url = require('url');
const path = new Map()

function queryNewComments(request,response){
  const params = url.parse(request.url,true).query;
  commentDao.queryNewComments(6,function(result){
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',result));
    response.end();
  })
}

path.set('/queryNewComments',queryNewComments)

function addComment(request,response){
  const params = url.parse(request.url,true).query;
  commentDao.insertComment(parseInt(params.bid),parseInt(params.parent),params.parentName,params.userName,params.content,params.email,timeUtil.timeUtil(),timeUtil.timeUtil(),function(result){
    response.writeHead(200);
    response.write(getResp.getResp('success','添加成功',null));
    response.end();
  })
}
path.set('/addComment',addComment);

function queryCommentByBlogId(request,response){
  const params = url.parse(request.url,true).query;
  commentDao.queryCommentByBlogId(parseInt(params.bid),function(result){
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',result));
    response.end();
  })
}

path.set('/queryCommentByBlogId',queryCommentByBlogId)

function queryCommentCount(request,response){
  const params = url.parse(request.url,true).query;
  commentDao.queryCommentCount(parseInt(params.bid),function(result){
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',result));
    response.end();
  })
}

path.set('/queryCommentCount',queryCommentCount)

function getRandomCode(request,response){
  let img = captcha.create({fontSize:50,width:100,height:34});
  response.writeHead(200);
  response.write(JSON.stringify(img));
  response.end();
}
path.set('/getRandomCode',getRandomCode);

module.exports.path = path;