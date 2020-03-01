// const every_day = new Vue({
//   el: '#every_day',
//   data: {
//     content: ''
//   },
//   computed: {
//     getContent() {
//       return this.content;
//     }
//   },
//   created() {
//     // 请求数据，给content赋值
//     axios({
//       method: 'get',
//       url: '/queryEveryDay'
//     }).then(function (result) {
//       every_day.content = result.data.data[0].content
//     }).catch(function (error) {
//       console.log(error)
//     })
//   },
// })

const article_list = new Vue({
  el: '#article_list',
  data: {
    page: 1,
    pageSize: 7,
    count: 100,
    pageNumList: [],
    article_list: [
      {
        title: '',
        content: '',
        date: '',
        views: '',
        tags: '',
        id: "",
        link: '',
        img:'',
      }
    ]
  },
  computed: {
    jumpTo: function () {
      return function (page) {
        this.getPage(page, this.pageSize);
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        document.body.style.marginTop = -scrollTop + 150 + "px";
        document.body.scrollTop = 0;
        document.body.style.transition = "all .7s ease-in-out";
        document.body.style.marginTop = 0;
        setTimeout(function () {
          document.body.style.transition = 'none';
        }, 3000);

        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    },
    getPage: function () {
      return function (page, pageSize) {
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        let tag = '';
        for (var i = 0; i < searcheUrlParams.length; i++) {
          if (searcheUrlParams[i].split("=")[0] == "tag") {
            try {
              tag = searcheUrlParams[i].split("=")[1];
            } catch (e) {
              console.log(e);
            }
          }
        };
        if(tag == ''){
          axios({
            method: 'get',
            url: '/queryBlogPage?page=' + (page - 1) + '&pageSize=' + pageSize,
          }).then(function (resp) {
            const result = resp.data.data;
            let arr = [];
            for (let i = 0; i < result.length; i++) {
              let temp = {};
              temp.title = result[i].title;
              temp.content = result[i].content.trim();
              function formatDate(now) {
                var year = now.getFullYear();  //取得4位数的年份
                var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
                var date = now.getDate();      //返回日期月份中的天数（1到31）
                var hour = now.getHours();     //返回日期中的小时数（0到23）
                var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
                var second = now.getSeconds(); //返回日期中的秒数（0到59）
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
              }
              const time = new Date(result[i].ctime * 1000);
              temp.date = formatDate(time) ;
              temp.views = result[i].views;
              temp.tags = result[i].tags;
              temp.img = result[i].img;
              temp.link = '/blog_detail.html?bid=' + result[i].id;
              arr.push(temp)
            }
            article_list.page = page;
            article_list.article_list = arr;
          }).catch(function (resp) {
            console.log(resp)
          });
          axios({
            method: 'get',
            url: '/queryCount'
          }).then(function (resp) {
            const result = resp.data.data[0].count;
            article_list.count = result;
            article_list.generatePageTool;
          }).catch(function (resp) {
            console.log(resp)
          });
        } else{
          axios({
            method: 'get',
            url: '/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag,
          }).then(function (resp) {
            const result = resp.data.data;
            let arr = [];
            for (let i = 0; i < result.length; i++) {
              let temp = {};
              temp.title = result[i].title;
              temp.content = result[i].content.trim();
              function formatDate(now) {
                var year = now.getFullYear();  //取得4位数的年份
                var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
                var date = now.getDate();      //返回日期月份中的天数（1到31）
                var hour = now.getHours();     //返回日期中的小时数（0到23）
                var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
                var second = now.getSeconds(); //返回日期中的秒数（0到59）
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
              }
              const time = new Date(result[i].ctime * 1000);
              temp.date = formatDate(time) ;
              temp.views = result[i].views;
              temp.tags = result[i].tags;
              temp.img = result[i].img;
              temp.link = '/blog_detail.html?bid=' + result[i].id;
              arr.push(temp)
            }
            article_list.page = page;
            article_list.article_list = arr;
          }).catch(function (resp) {
            console.log(resp)
          });
          axios({
            method:'get',
            url:'/queryByTagCount?tag=' + tag
          }).then(function(resp){
            article_list.count = resp.data.data[0].count;
            article_list.generatePageTool;
          })
        }

      }
    },
    generatePageTool: function () {
      var nowPage = this.page;
      var pageSize = this.pageSize;
      var totalCount = this.count;
      var result = [];
      result.push({ text: "上一页", page: 1 });
      if (nowPage > 2) {
        result.push({text: nowPage - 2, page:nowPage - 2});
    }
    if (nowPage > 1) {
        result.push({text: nowPage - 1, page:nowPage - 1});
    }
    result.push({text: nowPage, page:nowPage});
    if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({text:nowPage + 1, page: nowPage + 1});
    }
    if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({text:nowPage + 2, page: nowPage + 2});
    }
      result.push({ text: "下一页", page: parseInt((totalCount + pageSize - 1) / pageSize) });
      this.pageNumList = result;
      return result;
    }
  },
  created() {
    // 请求数据，给article_list赋值
    this.getPage(this.page, this.pageSize);
  },
  updated() {
    var list = document.querySelectorAll('.list');
    var acImg = document.querySelectorAll('.acImg');
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener('mouseenter', function () {
        acImg[i].style.transform = 'scale(1.3)';
      })
      list[i].addEventListener('mouseleave', function () {
        acImg[i].style.transform = 'scale(1)';
      })
    }

    var H = document.documentElement.clientHeight;//获取可视区域高度
    var S = document.documentElement.scrollTop || document.body.scrollTop; /* 鼠标滚轮距离顶部的距离 */

    for (let i = 0; i < list.length; i++) {
      // 循环判断一开始在屏幕视图里有几个是先需要出来的
      if (S < H) {
        // 判断是否在屏幕内，如果在屏幕内，就添加类名，
        list[i].classList.remove('fadeOutDown');
        list[i].classList.add('fadeInUp');
      }
    }
    function getTop(e) {
      /* 获取div距离顶部的距离 */
      var T = e.offsetTop;
      while (e = e.offsetParent) {
        T += e.offsetTop;
      }
      return T;
    }
    function lazyLoad() {
      var H = document.documentElement.clientHeight;//获取可视区域高度
      var S = document.documentElement.scrollTop || document.body.scrollTop;
      for (var i = 0; i < list.length; i++) {
        if (H + S - 50 > getTop(list[i])) {
          list[i].classList.remove('fadeOutDown');
          list[i].classList.add('fadeInUp');
          // animated[i].style.opacity = 1
        } else {
          list[i].classList.remove('fadeInUp');
          list[i].classList.add('fadeOutDown');
        }
      }
    }
    window.onscroll = function () {
      lazyLoad(list);
    }

  },
})









