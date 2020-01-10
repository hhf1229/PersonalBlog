const dbutil = require('./dbutil.js');

// 查询评论总量
function queryAllCommentsCount(success){
  const sql = 'select count(1) as count from comments';
  const params = [];
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


//查询浏览总量
function queryAllViewsCount(success) {
  const sql = `select sum(views) from blog`;
  const params = [];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql, params, function (error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
}

function queryHotBlog(size, success) {
  const sql = 'select * from blog order by views desc limit ?';
  const params = [size];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql, params, function (error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error)
    }
  })
}

function addViews(id, success) {
  const sql = 'update blog set views = views + 1 where id = ?';
  const params = [id];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
}

function insertBlog(title, content, views, tags, img, ctime, utime, success) {
  const sql = 'insert into blog(`title`,`content`,`views`,`tags`,`img`,`ctime`,`utime`) values(?,?,?,?,?,?,?)';
  const params = [title, content, views, tags, img, ctime, utime];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
}
function queryPage(page, pageSize, success) {
  const sql = 'select * from blog order by id desc limit ?,?';
  const params = [page * pageSize, pageSize];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
}

function queryBlog(id, success) {
  const sql = 'select * from blog where id=?';
  const params = [id];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
}
function queryBlogCount(success) {
  const sql = 'select count(1) as count from blog';
  const params = [];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
}
function queryBlogId(id, success) {
  const sql = 'select * from blog where id = ?';
  const params = [id];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(sql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
}


module.exports.insertBlog = insertBlog;
module.exports.queryBlog = queryBlog;
module.exports.queryPage = queryPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogId = queryBlogId
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryAllViewsCount = queryAllViewsCount;
module.exports.queryAllCommentsCount = queryAllCommentsCount;

