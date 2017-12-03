import React from 'react';
import './header.less';

const Header = ()=>{
  return (
    <header id="header" className="container">
      <div className="search-box">
        <input type="text" className="col-md-10" />
        <a href="javascript:;" className="btn btn-info col-md-2" >Search...</a>
      </div>
    </header>
  )
};

export default Header;
