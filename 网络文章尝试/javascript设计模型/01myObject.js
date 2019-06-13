/*
javascript 设计模型中的代码案例
1.3.1 数据封装
*/

var myObject = (function () {
    // 利用闭包创建一个私有属性
    // 该属性只能在函数内部访问到
    var __name = 'Nana';
    return {
        getName: function () {
            return __name;
        }
    }
})();

console.info(myObject.getName()); // String Nana
console.info(myObject.__name); // undefined

/*
如何使用 symbol 创建私有属性
*/

var Person = (function () {
    var name = Symbol('name');

    function Person(personName) {
        this[name] = personName;
    }
    Person.prototype = {
        constructor: Person,
        getName: function () {
            return this[name];
        }
    }
    return Person;
})();

var girl = new Person('Nana');
console.log(girl); // Object
console.log(girl instanceof Person); // true
console.log(girl.constructor === Person); // true
console.log(girl.getName()); // String Nana
console.log(girl.name); // undefined