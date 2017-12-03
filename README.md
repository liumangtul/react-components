## React Components

————————————————————

* Todo List 演示
* swiper轮播图封装组件
* node搭建的mock测试环境
* webpack development environment
* webpack production  environment
* less

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

