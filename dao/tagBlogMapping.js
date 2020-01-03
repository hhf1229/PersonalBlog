const dbutil = require('./dbutil.js');
function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
  const sql = 'insert into tag_blog_mapping(`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?)';
  const params = [tagId,blogId,ctime,utime];
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
function queryByTag(tagId,page,pageSize,success){
  const sql = 'select * from tag_blog_mapping where tag_id = ? limit ?,?';
  const params = [tagId,page*pageSize,pageSize];
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
function queryByTagCount(tagId,success){
  const sql = 'select count(1) as count from tag_blog_mapping where tag_id = ?';
  const params = [tagId];
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
module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;
