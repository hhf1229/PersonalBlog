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

        let bid = -2;

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
    let bid = -2;
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