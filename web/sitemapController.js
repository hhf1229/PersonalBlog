const sitemapDao = require('../dao/sitemapDao');
const timeUtil = require('../util/timeUtil.js');
const getResp = require('../util/respUtil.js');
const url = require('url');

const path = new Map();

function queryAllBlog(request,response){
  sitemapDao.queryAllBlog(function(result){
    response.writeHead(200);
    response.write(getResp.getResp('success','查询成功',result));
    response.end()
  })
}

path.set('/queryAllBlog',queryAllBlog);


module.exports.path = path;