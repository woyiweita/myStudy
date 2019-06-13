/*
    JavaScript 设计模式
    3.2.4 高阶函数的应用   => 86页
    uncurrying

*/

Function.prototype.uncurrying = function () {
    // 保存原函数的引用；
    var self = this;
    return function () {
        // Array.prototype.shift() 从数组中删除第一个元素，并返回该元素的值。
        // 会对原数组产生影响，改变原数组长度
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj.arguments);
    }
}