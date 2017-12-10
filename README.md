## React Components

————————————————————

* Todo List 演示
* swiper轮播图封装组件
* 日期选择组件-Alpha版
* node搭建的mock测试环境
* webpack development environment
* webpack production  environment
* less

###### 目前项目结构尚未调整
###### todos 和 swiper 稍后我会整合到src目录下的
##### 正常的项目结构应该是,其中只要组件有数据通信存在，就应该有一个redux。
```

        -node_modules
        -src
            --app
            --header
            --footer
            --content
                ---todos
                      ----reudx
                      ----news
                            ---redux
                                   -----action
                                   -----reducer
                            **.jsx
                            **.less
                            ...
                      ----iscroll
                      ...
            --components
                ---dateTimePicker
                ---swiper
            index.html
            index.jsx
            redux
                ---reducer
                ---store
        -build

        -webpack.config.dev.js
        -webpack.config.production.js
        README.md
        package.json
        ...其他相关文件
```
###### @部分目录
----------------------
### 简述
 开始swiper组件想用redux，后来认为组件不能过于依赖。so 只是运用了react来实现。
 开始想了两种轮播图的实现方法，我看到类似 http://m.jd.com 这里的轮播图是用的
 控制每一个Li的:`transfrom:transloateX(**px)`来实现的。但是自己认为控制`ul`来
 实现，更能体现性能。既然是移动端的，那么就不再需要用`position:absolute;`，只用
 `transform`。毕竟实时变动left值，太损耗性能。

-----
### Install

###### 启动node服务器:(测试production环境)
```
    npm run swiper_mock
```

###### development :
```
    npm run swiper_dev
```

###### production :
```
    npm run swiper_build
```



###### polyfill
### Question
key:
chrome 56版以上 关于preventDefault 问题，参考：<br/>
https://www.chromestatus.com/features/5093566007214080
```
Treat Document Level Touch Event Listeners as Passive
DOM

AddEventListenerOptions defaults passive to false. With this change touchstart and touchmove listeners added to the document will default to passive:true (so that calls to preventDefault will be ignored)..

 If the value is explicitly provided in the AddEventListenerOptions it will continue having the value specified by the page.

 This is behind a flag starting in Chrome 54, and enabled by default in Chrome 56. See https://developers.google.com/web/updates/2017/01/scrolling-intervention
```
addEventListener from Chrome <br/>
e.preventDefault();<br/>
 https://github.com/zzarcon/default-passive-events <br/>
 https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js


关于flex

``` style
/* 子元素-平均分栏 */
.flex1 {
    -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1;         /* OLD - Firefox 19- */
    width: 20%;               /* For old syntax, otherwise collapses. */
    -webkit-flex: 1;          /* Chrome */
    -ms-flex: 1;              /* IE 10 */
    flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
/* 父元素-横向排列（主轴） */
.flex-h {
    display: box;              /* OLD - Android 4.4- */

    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */


    /* 09版 */
    -webkit-box-orient: horizontal;
    /* 12版 */
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    -o-flex-direction: row;
    flex-direction: row;
}
/* 父元素-横向换行 */
.flex-hw {
    /* 09版 */
    /*-webkit-box-lines: multiple;*/
    /* 12版 */
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
}
/* 父元素-水平居中（主轴是横向才生效） */
.flex-hc {
    /* 09版 */
    -webkit-box-pack: center;
    /* 12版 */
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
    /* 其它取值如下：
        align-items     主轴原点方向对齐
        flex-end        主轴延伸方向对齐
        space-between   等间距排列，首尾不留白
        space-around    等间距排列，首尾留白
     */
}
/* 父元素-纵向排列（主轴） */
.flex-v {
    display: box;              /* OLD - Android 4.4- */

    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */


    /* 09版 */
    -webkit-box-orient: vertical;
    /* 12版 */
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
}
/* 父元素-纵向换行 */
.flex-vw {
    /* 09版 */
    /*-webkit-box-lines: multiple;*/
    /* 12版 */
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
}
/* 父元素-竖直居中（主轴是横向才生效） */
.flex-vc {
    /* 09版 */
    -webkit-box-align: center;
    /* 12版 */
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
}
/* 子元素-显示在从左向右（从上向下）第1个位置，用于改变源文档顺序显示 */
.flex-1 {
    -webkit-box-ordinal-group: 1;   /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-ordinal-group: 1;      /* OLD - Firefox 19- */
    -ms-flex-order: 1;              /* TWEENER - IE 10 */
    -webkit-order: 1;               /* NEW - Chrome */
    order: 1;                       /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
/* 子元素-显示在从左向右（从上向下）第2个位置，用于改变源文档顺序显示 */
.flex-2 {
    -webkit-box-ordinal-group: 2;   /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-ordinal-group: 2;      /* OLD - Firefox 19- */
    -ms-flex-order: 2;              /* TWEENER - IE 10 */
    -webkit-order: 2;               /* NEW - Chrome */
    order: 2;                       /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
```