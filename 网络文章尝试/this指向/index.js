/*
关于this 的指向

需要考虑几个方面
1. 是否严格模式
2. 浏览器/node


在全局作用域下 
a. 在 node 下无论是严格模式还是非严格模式 统一指向 {}
b. 在浏览器下
*/

"use strict";

/*
// 第一种，在全局模式下
console.log(this);
*/

// 第二种，在构造函数下
// 情况一，不返回对象，指向该实例
function PersonOne(name) {
    console.log(this);
    this.name = name;
}

var girl = new PersonOne('Nana');
var boy = new PersonOne('Bryan');

console.info(girl.name);
console.info(boy.name);
console.info('**********分割线************');
// 情况二，返回对象，指向返回的对象
var obj = {
    name: "Kimi"
};

function PersonTwo(name) {
    console.log(this);
    this.name = name;
    return obj;
}
var use1 = new PersonTwo('Nana');
var use2 = new PersonTwo('Bryan');
console.info(use1.name);
console.info(use2.name);
console.info(use1 === use2);