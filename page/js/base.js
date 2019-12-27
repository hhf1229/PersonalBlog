const randomTags = new Vue({
  el:'#random_tags',
  data:{
    tagList:['fdjsl','fsjdlf','aoifle','dsfji','jfisdogm','ienwe','iwmlkg','zmfe','ojfpw','pelnfe','fdjsl','fsjdlf','aoifle','dsfji','jfisdogm','ienwe','iwmlkg','zmfe','ojfpw','pelnfe']
  },
  computed:{
    randomColor(){
      return function(){
        let red = Math.random()*255;
        let green = Math.random()*255;
        let blue = Math.random()*255;
        return 'rgb('+red+','+green+','+blue+')';
      }
    },
    randomSize(){
      return function(){
        let font = (Math.random()*20) + 12 + 'px';
        return font
      }
    }
  },
  create(){

  }
})

const newHot = new Vue({
  el:'#new_hot',
  data:{
    newList:[
      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },
      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      },      {
        title:'使用码云git的webhook实现生产环境代',
        link:'http://www.baidu.com'
      }
    ]
  },
  create(){

  }
})

const newComments = new Vue({
  el:'#new_comments',
  data:{
    commentList:[
      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },
      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      },      {
        name:'园长瓜',
        content:'你的留言板是真的酷炫',
        date:'2018-10-10'
      }
    ]
  },
  create(){

  }
})