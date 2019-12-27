const blogDao = require('../dao/blogDao.js');
const timeUtil = require('../util/timeUtil.js');
const getResp = require('../util/respUtil.js');
const tagsDao = require('../dao/tagsDao.js');
const insertTagBlogMapping = require('../dao/tagBlogMapping.js');
const url = require('url');

const path = new Map();

function queryBlogById(request,response){
  const params = url.parse(request.url,true).query;
  blogDao.queryBlogId(params.bid,function(result){
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',result));
    response.end();
  })
}

path.set('/queryBlogById',queryBlogById)

function queryCount(request,response){
  blogDao.queryBlogCount(function(result){
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',result));
    response.end();
  })
}

path.set('/queryCount',queryCount)

function queryBlogPage(request,response){
  const params = url.parse(request.url,true).query;
  blogDao.queryPage(parseInt(params.page),parseInt(params.pageSize),function(result){
    for (var i = 0 ; i < result.length ; i ++) {
      result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
      result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
      result[i].content = result[i].content.substring(0, 300);
  }
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',result));
    response.end();
  })
}
path.set('/queryBlogPage',queryBlogPage);

function editBlog(request,response){
  const params = url.parse(request.url,true).query;
  const tags = params.tags.replace("，", ",");
  request.on('data',function(data){
    blogDao.insertBlog(params.title,data.toString(),0,tags,timeUtil.timeUtil(),timeUtil.timeUtil(),function(result){
      response.writeHead(200),
      response.write(getResp.getResp('success','添加成功',null));
      response.end();
      const blogId = result.insertId;
      let tagList = tags.split(',');
      for (let i = 0; i < tagList.length; i++) {
        if(tagList[i] == ''){
          continue;
        }
        queryTag(tagList[i],blogId);
      }
    })
  })
}

path.set('/editBlog',editBlog);

function queryTag(tag,blogId){
  tagsDao.queryTags(tag,timeUtil.timeUtil(),timeUtil.timeUtil(),function(result){
      if(result == null || result.length == 0){
        insertTag(tag,blogId);
      }else{
        insertTagBlogMapping.insertTagBlogMapping(result[0].id,blogId,timeUtil.timeUtil(),timeUtil.timeUtil(),function(){});
      }
  })
}

function insertTag(tag,blogId){
  tagsDao.insertTags(tag,timeUtil.timeUtil(),timeUtil.timeUtil(),function(result){
    tagBlogMapping(result.insertId,blogId);
  })
}

function tagBlogMapping(tagId,blogId){
  insertTagBlogMapping.insertTagBlogMapping(tagId,blogId,timeUtil.timeUtil(),timeUtil.timeUtil(),function(result){

  })
}
module.exports.path = path;