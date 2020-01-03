const dbutil = require('./dbutil');

function queryAllBlog(success){
  const sql = 'select * from blog order by id desc';
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

module.exports.queryAllBlog = queryAllBlog;