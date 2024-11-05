const fun = (document: Document) => {
  // 获取屏幕可视区域宽度
  var deviceWidth = document.documentElement.clientWidth;
  // 区分pc端和移动端，根据设计稿宽度计算根字体大小
  if (deviceWidth > 768) {
    // PC 设计稿宽度 1920px / 根字体大小100px = 19.2
    document.documentElement.style.fontSize = deviceWidth / 19.2 + "px";
  } else {
    // H5 设计稿宽度 720px / 根字体大小100px = 7.2
    document.documentElement.style.fontSize = deviceWidth / 7.2 + "px";
  }
};

fun(document);
window.onresize = () => {
  fun(document);
};
