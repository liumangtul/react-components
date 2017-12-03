const l = {
  //setCss3(oUl,'transform',translateX(12px));
  setCss3:(obj,attr,value)=>{
    const arr = ['Webkit','Moz','Ms','O',''];
    for(let i = 0; i < arr.length; i++ ){
      const style = attr.replace(attr[0],attr[0].toUpperCase());
      obj.style[arr[i]+style] = value;
    }
    //obj.style['webkitTransform'] = 'translateX('+value+'px)';
  },
  setCss3ToJson:(attr,value)=>{
    const arr = ['Webkit','Moz','Ms','O'];
    let json = {};
    for(let i = 0; i < arr.length; i++ ){
      const style = attr.replace(attr[0],attr[0].toUpperCase());
      json[arr[i]+style] = value;
    }
    json[attr] = value;
    return json;
  }
};

export default l;