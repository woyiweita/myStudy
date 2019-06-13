/*

基本语法格式
1. 暴露模块
使用 module.exports  =  [value]
或者  exports.[xxx] = [value]

2. 引入模块
require([xxx]);


[xxx]  为模块名
[value] 为对应的模块设置
*/



let name = "Nana";
let sayHi = function (name) {
    // console.info(this);
    name = name || this.name;
    return `Hi! ${name}`;
}
// 暴露模块
// 方法一：
module.exports = {
    name,
    sayHi
}
// 方法二：
// module.exports.name = name;
// module.exports.sayHi = sayHi;