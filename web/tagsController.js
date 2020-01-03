const tagDao = require('../dao/tagDao');
const timeUtil = require('../util/timeUtil.js');
const blogDao = require('../dao/blogDao');
const getResp = require('../util/respUtil.js');
const tagsDao = require('../dao/tagsDao.js');
const TagBlogMapping = require('../dao/tagBlogMapping.js');
const url = require('url');

const path = new Map();
function queryRandomTags(request,response){
  tagDao.queryRandomTags(function(result){
    result.sort(function(){
      return Math.random() > 0.5? true:false;
    })
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',result));
    response.end();
  })
}
path.set('/queryRandomTags',queryRandomTags);


function queryByTag(request,response){
  const params = url.parse(request.url,true).query;
  tagsDao.queryTags(params.tag,function(result){
    if(result == null || result.length == 0){
      response.writeHead(200);
      response.write(getResp.getResp('success','查询成功',result));
      response.end();
    }else{
      TagBlogMapping.queryByTag(result[0].id, parseInt(params.page),parseInt(params.pageSize),function(result){
        let blogList = [];
        for(let i = 0; i < result.length;i++){
          blogDao.queryBlogId(result[i].blog_id,function(result){
            // console.log('===========');
            // console.log(result);
            blogList.push(result[0])
          })
        };
        getResult(blogList,result.length,response);
      })
    }
  })
}

path.set('/queryByTag',queryByTag);

function getResult(blogList,len,response){
  if(blogList.length <  len){
    setTimeout(function(){
      getResult(blogList,len,response);
    },10)
  }else{
    for (var i = 0 ; i < blogList.length ; i ++) {
      blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
      blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
      blogList[i].content = blogList[i].content.substring(0,350);
  }
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',blogList));
    response.end();
  }
}

function queryByTagCount(request,response){
  const params = url.parse(request.url,true).query;
  tagsDao.queryTags(params.tag,function(result){
      TagBlogMapping.queryByTagCount(result[0].id,function(result){
        response.writeHead(200);
        response.write(getResp.getResp('success','查询成功',result));
        response.end();
      })
  })
}
path.set('/queryByTagCount',queryByTagCount);
module.exports.path = path;