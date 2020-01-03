const dbutil = require('./dbutil.js');
function insertTags(tags,ctime,utime,success){
  const sql = 'insert into tags(`tag`,`ctime`,`utime`) values(?,?,?)';
  const params = [tags,ctime,utime];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql,params,function(error,result){
    if(error == null){
      success(result)
    }else{
      console.log(error)
    }
  })
}
function queryTags(tag,success){
  const sql = 'select * from tags where tag=?';
  const params = [tag];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql,params,function(error,result){
    if(error == null){
      success(result)
    }else{
      console.log(error)
    }
  })
}
module.exports.insertTags = insertTags;
module.exports.queryTags = queryTags;