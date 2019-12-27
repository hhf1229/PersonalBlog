const every_day = new Vue({
  el: '#every_day',
  data: {
    content: 'fsdfsgdasgagfda'
  },
  computed: {
    getContent() {
      return this.content;
    }
  },
  created() {
    // 请求数据，给content赋值
    axios({
      method: 'get',
      url: '/queryEveryDay'
    }).then(function (result) {
      every_day.content = result.data.data[0].content
    }).catch(function (error) {
      console.log(error)
    })
  },
})

const article_list = new Vue({
  el: '#article_list',
  data: {
    page: 1,
    pageSize: 5,
    count: 100,
    pageNumList: [],
    article_list: [
      {
        title: 'Laravel5.4安装passport时遇到的一些问题',
        content: '安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
        date: '2018-10-10',
        views: '101',
        tags: 'test1 test2',
        id: "1",
        link: ''
      }
    ]
  },
  computed: {
    jumpTo: function () {
      return function (page) {
        this.getPage(page, this.pageSize);
      }
    },
    getPage: function () {
      return function (page, pageSize) {
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
            temp.date = result[i].ctime;
            temp.views = result[i].views;
            temp.tags = result[i].tags;
            temp.link ='/blog_detail.html?bid=' + result[i].id;
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
      }
    },
    generatePageTool: function () {
      var nowPage = this.page;
      var pageSize = this.pageSize;
      var totalCount = this.count;
      var result = [];
      result.push({ text: "<<", page: 1 });
      if (nowPage > 2) {
        result.push({ text: nowPage - 2, page: nowPage - 2 });
      }
      if (nowPage > 1) {
        result.push({ text: nowPage - 1, page: nowPage - 1 });
      }
      result.push({ text: nowPage, page: nowPage });
      if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({ text: nowPage + 1, page: nowPage + 1 });
      }
      if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({ text: nowPage + 2, page: nowPage + 2 });
      }
      result.push({ text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize) });
      this.pageNumList = result;
      return result;
    }
  },
  created() {
    // 请求数据，给article_list赋值
    this.getPage(this.page, this.pageSize);
  }
})

