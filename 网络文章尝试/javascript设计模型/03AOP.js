/**
 * JavaScript 设计模式
 * 3.2.3 高阶函数实现AOP   => 83页
 * AOP
 * 
 */

Function.prototype.before = function (beforefn) {
    var _self = this; // => func
    return function () {
        beforefn.apply(this, arguments); // 1
        return _self.apply(this, arguments); // 执行 func
    }
}

Function.prototype.after = function (afterfn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}

var func = function () {
    console.info(2);
}

func = func.before(function () {
    console.info(1);
}).after(function () {
    console.info(3);
});
func();