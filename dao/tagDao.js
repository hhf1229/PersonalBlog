const dbutil = require('./dbutil');

function queryRandomTags(success){
  const sql = 'select * from tags';
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

module.exports.queryRandomTags = queryRandomTags;