const blog_detail = new Vue({
  el: '#blog_detail',
  data: {
    title: '',
    views: 0,
    tags: '',
    ctime: '',
    content: '',
  },
  computed: {

  },
  created() {
    var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
    if (searcheUrlParams == "") {
      return;
    }
    var bid = -1;

    for (var i = 0; i < searcheUrlParams.length; i++) {
      if (searcheUrlParams[i].split("=")[0] == "bid") {
        try {
          bid = parseInt(searcheUrlParams[i].split("=")[1]);
        } catch (e) {
          console.log(e);
        }
      }
    };
    axios({
      method: 'get',
      url: '/queryBlogById?bid=' + bid
    }).then(function (resp) {
      const result = resp.data.data[0];
      blog_detail.title = result.title;
      blog_detail.views = result.views;
      blog_detail.tags = result.tags;
      function formatDate(now) {
        var year = now.getFullYear();  //取得4位数的年份
        var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
        var date = now.getDate();      //返回日期月份中的天数（1到31）
        var hour = now.getHours();     //返回日期中的小时数（0到23）
        var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
        var second = now.getSeconds(); //返回日期中的秒数（0到59）
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
      }
      const time = new Date(result.ctime * 1000);
      blog_detail.ctime = formatDate(time) ;
      blog_detail.content = result.content;
    }).catch(function (resp) {
      console.log('请求错误')
    });
  },
})

const send_comment = new Vue({
  el: '#send_comment',
  data: {
    vcode: '',
    rightCode:''
  },
  computed: {
    changeCode() {
      return function () {
        axios({
          method: 'get',
          url: '/getRandomCode'
        }).then(function (resp) {
          send_comment.vcode = resp.data.data
          send_comment.rightCode = resp.data.text
        }).catch(function (resp) {
          console.log(resp)
        })
      }
    },
    sendComment: function () {
      return function () {
        const code = document.getElementById('comment_code').value;
        if(code.toLowerCase() != send_comment.rightCode.toLowerCase()){
          alert('验证码错误');
          return;
        }
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searcheUrlParams == "") {
          return;
        }
        let bid = -10;

        for (var i = 0; i < searcheUrlParams.length; i++) {
          if (searcheUrlParams[i].split("=")[0] == "bid") {
            try {
              bid = parseInt(searcheUrlParams[i].split("=")[1]);
            } catch (e) {
              console.log(e);
            }
          }
        };
        let reply = document.getElementById('comment_reply').value;
        let replyName = document.getElementById('comment_reply_name').value;
        let name = document.getElementById('comment_name').value;
        let email = document.getElementById('comment_email').value;
        let content = document.getElementById('comment_content').value;
        if(email == ''){
          alert('邮箱不能为空！');
          return;
        };
        if(name == ''){
          alert('用户名不能为空！');
          return;
        };
        if(content == ''){
          alert('评论内容不能为空！');
          return;
        }
        axios({
          method: 'get',
          url: '/addComment?bid=' + bid + '&parent=' + reply + '&parentName='+replyName+ '&userName=' + name + '&content=' + content +'&email=' + email 
        }).then(function (resp) {
          alert(resp.data.msg)
        }).catch(function (resp) {
          console.log('请求失败')
        })
      }
    }
  },
  created() {
    this.changeCode()
  },
});


const blog_comments = new Vue({
  el: '#blog_comments',
  data: {
    total: 0,
    comments: [
      
    ]
  },
  computed: {
    reply:function(){
      return function(commentId,commentName){
        document.getElementById('comment_reply').value = commentId;
        document.getElementById('comment_reply_name').value = commentName;
        location.href = '#send_comment';
      }
    }
  },
  created() {
    const searchBid = location.search.indexOf('?') > -1 ?location.search.split('?')[1].split('&'):'';
    if(searchBid == ''){
      return ;
    }
    let bid = -10;
    for(let i = 0; i < searchBid.length;i++){
      if(searchBid[i].split('=')[0] == 'bid'){
        try {
          bid = searchBid[i].split('=')[1];
        } catch (e) {
          console.log(e)
        }
      }
    }

    axios({
      method: 'get',
      url: '/queryCommentByBlogId?bid='+ bid
    }).then(function (resp) {
      blog_comments.comments = resp.data.data;
      for(let i = 0; i < blog_comments.comments.length;i++){
        if(blog_comments.comments[i].parent>-1){
          blog_comments.comments[i].options = '回复@'+blog_comments.comments[i].parent_name;
        }
      }
    }).catch(function (resp) {
      console.log(resp)
    });
    axios({
      method:'get',
      url:'/queryCommentCount?bid='+bid
    }).then(function(resp){
      blog_comments.total = resp.data.data[0].count;
    }).catch(function(resp){
      console.log(resp)
    })
  },
})

