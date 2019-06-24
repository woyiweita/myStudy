/**
 * JavaScript 设计模式
 * 3.2.4 高阶函数的应用   => 85页
 * currying
 * 函数柯理化
 * 
 * 需求是计算金额，
 *  - 传入参数则添加到数组中
 *  - 未传入参数则进行价格计算并返回结果
 */



// 价格计算
var cost = (function () {
    var money = 0;
    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();

// 柯理化处理，传入参数追加，未传参计算总和

var currying = function (fn) {
    var args = [];
    return function () {
        // 判断传入参数的个数
        // 如果个数为0，则进行计算
        // 有个数则进行数据保存。
        if (arguments.length === 0) {
            return fn.apply(null, args);
        } else {
            args.push(arguments[0]);
            console.info(arguments.callee);
        }
    }
}

cost = currying(cost);
cost(100);
cost(200);
cost(300);

cost();