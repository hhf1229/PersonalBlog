const randomTags = new Vue({
  el: '#random_tags',
  data: {
    tagList: [],
  },
  computed: {
    randomColor() {
      return function () {
        let red = Math.random() * 255;
        let green = Math.random() * 255;
        let blue = Math.random() * 255;
        return 'rgb(' + red + ',' + green + ',' + blue + ')';
      }
    },
    randomSize() {
      return function () {
        let font = (Math.random() * 20) + 12 + 'px';
        return font
      }
    }
  },
  created() {
    axios({
      method: 'get',
      url: '/queryRandomTags'
    }).then(function (resp) {
      for (let i = 0; i < resp.data.data.length; i++) {
        if (randomTags.tagList.length > 15) {
          return randomTags.tagList
        } else {
          randomTags.tagList.push({ text: resp.data.data[i].tag, link: '/?tag=' + resp.data.data[i].tag });
        }
      }
      // randomTags.tagList = resp

    }).catch(function (resp) {
      console.log(resp)
    });

  }
})

const newHot = new Vue({
  el: '#new_hot',
  data: {
    newList: [],
  },
  created() {
    axios({
      method: 'get',
      url: '/queryHotBlog'
    }).then(function (resp) {
      let result = [];
      for (let i = 0; i < resp.data.data.length; i++) {
        let temp = {};
        temp.title = resp.data.data[i].title;
        temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
        temp.img = resp.data.data[i].img;
        function formatDate(now) {
          var year = now.getFullYear();  //取得4位数的年份
          var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
          var date = now.getDate();      //返回日期月份中的天数（1到31）
          var hour = now.getHours();     //返回日期中的小时数（0到23）
          var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
          var second = now.getSeconds(); //返回日期中的秒数（0到59）
          return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
        const time = new Date(resp.data.data[i].ctime * 1000);
        temp.date = formatDate(time);
        // temp.date = resp.data.data[i].ctime;
        result.push(temp);
      }
      newHot.newList = result;

    }).catch(function (resp) {
      console.log(resp);
    })
  }
})

const newComments = new Vue({
  el: '#new_comments',
  data: {
    commentList: [
      {
        name: '园长瓜',
        content: '你的留言板是真的酷炫',
        date: '2018-10-10'
      },
      {
        name: '园长瓜',
        content: '你的留言板是真的酷炫',
        date: '2018-10-10'
      }, {
        name: '园长瓜',
        content: '你的留言板是真的酷炫',
        date: '2018-10-10'
      }, {
        name: '园长瓜',
        content: '你的留言板是真的酷炫',
        date: '2018-10-10'
      }, {
        name: '园长瓜',
        content: '你的留言板是真的酷炫',
        date: '2018-10-10'
      }
    ]
  },
  created() {
    axios({
      method: 'get',
      url: '/queryNewComments'
    }).then(function (resp) {
      let result = [];
      for (let i = 0; i < resp.data.data.length; i++) {
        let temp = {};
        temp.name = resp.data.data[i].user_name;
        temp.content = resp.data.data[i].comments;

        function formatDate(now) {
          var year = now.getFullYear();  //取得4位数的年份
          var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
          var date = now.getDate();      //返回日期月份中的天数（1到31）
          var hour = now.getHours();     //返回日期中的小时数（0到23）
          var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
          var second = now.getSeconds(); //返回日期中的秒数（0到59）
          return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
        const time = new Date(resp.data.data[i].ctime * 1000);

        temp.date = formatDate(time);
        result.push(temp);
      };
      newComments.commentList = result;
    }).catch(function (resp) {
      console.log(resp);
    })
  }
})

const card = new Vue({
  el: '#card',
  data: {
    viewsCount: '',
    commentsCount:''
  },
  created() {
    //查询浏览总量
    axios({
      method: 'get',
      url: '/queryAllViewsCount'
    }).then(function (resp) {
      card.viewsCount = resp.data.data[0]['sum(views)'];
    }).catch(function (resp) {
      console.log(resp)
    });

    // 查询所有评论
    axios({
      method:'get',
      url:'/queryAllCommentsCount'
    }).then(function(resp){
      card.commentsCount = resp.data.data[0].count;
    }).catch(function(resp){
      console.log(resp);
    })
  }
})