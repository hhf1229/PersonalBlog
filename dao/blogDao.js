const dbutil = require('./dbutil.js');
function insertBlog(title,content,views,tags,ctime,utime,success){
  const sql = 'insert into blog(`title`,`content`,`views`,`tags`,`ctime`,`utime`) values(?,?,?,?,?,?)';
  const params = [title,content,views,tags,ctime,utime];
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
function queryPage(page,pageSize,success){
  const sql = 'select * from blog order by id desc limit ?,?';
  const params = [page*pageSize,pageSize];
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

function queryBlog(id,success){
  const sql = 'select * from blog where id=?';
  const params = [id];
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
function queryBlogCount(success){
  const sql = 'select count(1) as count from blog';
  const params = [];
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
function queryBlogId(id,success){
  const sql = 'select * from blog where id = ?';
  const params = [id];
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


module.exports.insertBlog = insertBlog;
module.exports.queryBlog = queryBlog;
module.exports.queryPage = queryPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogId = queryBlogId


