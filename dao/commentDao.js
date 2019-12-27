const dbutil = require('./dbutil.js');
function insertComment(blog_id,parent,parentName,user_name,comments,email,ctime,utime,success){
  const sql = 'insert into comments(`blog_id`,`parent`,`parent_name`,`user_name`,`comments`,`email`,`ctime`,`utime`) values(?,?,?,?,?,?,?,?)';
  const params = [blog_id,parent,parentName,user_name,comments,email,ctime,utime];
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

function queryCommentByBlogId(blog_id,success){
  const sql = 'select * from comments where blog_id = ?';
  const params = [blog_id];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(error)
    }
  })
}
function queryCommentCount(blog_id,success){
  const sql = 'select count(1) as count from comments where blog_id = ?';
  const params = [blog_id];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(error)
    }
  })
}
module.exports.insertComment = insertComment;
module.exports.queryCommentByBlogId = queryCommentByBlogId;
module.exports.queryCommentCount = queryCommentCount;