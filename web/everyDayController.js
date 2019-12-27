const everyDayDao = require('../dao/everyDayDao.js');
const timeUtil = require('../util/timeUtil.js');
const getResp = require('../util/respUtil.js');
const path = new Map();
function editEveryDay(request,response){
  request.on('data',function(data){
    everyDayDao.insertEveryDay(data.toString().trim(),timeUtil.timeUtil(),function(result){
      response.writeHead(200);
      response.write(getResp.getResp('success','添加成功',null));
      response.end();
    })
  })
}
path.set('/editEveryDay',editEveryDay);

function queryEveryDay(request,response){
    everyDayDao.queryEveryDayDao(function(result){
      response.writeHead(200);
      response.write(getResp.getResp('success','添加成功',result));
      response.end();
    })
}
path.set('/queryEveryDay',queryEveryDay);

module.exports.path= path;