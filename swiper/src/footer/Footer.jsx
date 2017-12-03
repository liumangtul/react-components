import React from 'react';
import { Link } from 'react-router-dom';
import './footer.less';

const Footer = ()=>{
  return (
    <footer id="footer">
      <nav>
        <Link to="/"><span className="glyphicon glyphicon-home"></span><i>首页</i></Link>
        <Link to="/paperList"><span className="glyphicon glyphicon-list"></span><i>列表</i></Link>
        <Link to="/contactMe"><span className="glyphicon glyphicon-user"></span><i>联系我</i></Link>
      </nav>
    </footer>
  )
};

export default Footer;
