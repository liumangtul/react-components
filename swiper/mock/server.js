const express = require('express');
const static = require('express-static');

const server = express();
server.listen(8081);


server.use(express.static('swiper/build'));