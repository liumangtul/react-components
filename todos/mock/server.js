const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const queryString = require('queryString');
//const expressStatic = require('express-static');
// const fs = require('fs');
// const pathLib = require('path');

const myMulter = new multer({
    dest:'./upload/'
});

const server = express();
server.listen(3000);

// post 数据
server.use(bodyParser.urlencoded({
    extended:false
}));
server.use(myMulter.any());

//用户请求
/*server.post('/api/!**',(req,res,next)=>{
    console.log(req.body);
    console.log(req.files);
    // const ext = pathlib.parse(req.files[0].originalname).ext;

    // fs.rename(req.files[0].path,req.files[0].path+ext,(err)=>{
    //     if(err){
    //         res.send('Error');
    //         res.end();
    //     }
    //     next();
    // });
    // next();
});*/

// static数据
// server.use(expressStatic('/'));

server.use('/api/newslist',(req,res)=>{
    let data = `党的十八 大以来，习近平总书记在 国内考察调研过程 中，走进农户 家里，经常 会问起村民 使用的是水厕还 是旱厕，在视察村 容村貌时也会详细了 解相关情况。
　　一个国家的最 高领导人，为什么对老 百姓如厕的事如此关心？
　　说起农村厕所，大多 数人的第一感受 是又脏又臭。有些 厕所就是几捆 玉米杆围起一个摇 摇欲坠的棚子 ，有些是在自家 院墙外面用 土坯或碎石块堆 一个厕所、有的两块青 石一搭便是厕所。
　　这些旱厕，不仅仅是 气味难闻，到了夏天蚊蝇 乱飞，更重要的是卫 生隐患大。国家旅游 局发布的《厕所革 命推进报告》中提到，农 村地区80%的传染病是 由厕所粪便污染和饮水不 卫生引起的。其中与粪便 有关的传染病达 30多种，最常见 的有痢疾、霍乱、肝炎、感染性 腹泻等。
　　厕所不仅是日常 生活必备的设施，还是一个地方 文明程度的标志。由于基础设 施不配套以及 陈旧观念的影响，农村土 厕并未完全消失，严重影响着农村 的生态环境和群众的 身体健康。要改变这一状况，就必须来个“厕 所革命”，解决好厕所问题在新农 村建设中具有 标志性意义。
　　“厕所革 命”看是小事，却是老百姓 生活中的大事。我们带您 走进习近平总书记 关心的“小厕所、大民生”。`.split(/,|\s|。|《|》|、|"|“|”/img);
    for(let i = 0; i<data.length;i++){
        if(/\s+/g.test(data[i]) || data[i] === '')data[i]=parseInt(Math.random()*100);
    }
    for(let i = 0; i<data.length;i++){
        data[i] = {
            name:data[i],
            id:i
        }
    }
    res.send({
        result:0,
        data:data
    });
    res.end();
});

server.use('/api/removeNews',(req,res)=>{
    console.log(req.body,req.query);
    res.send({
        id:req.body['id'],
        result:0,
        mes:"删除成功!"
    });
    res.end();
});