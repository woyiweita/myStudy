### 题目解读
　　使用JS实现一个函数，该函数可以用于无线的累加求和。当传递参数时，获取参数并参与计算，没有传递参数时或者调用结束时返回最终的计算结果。最终的实现类似如下的效果：
```javascript
    add(1); // => 1
    add(1)(2); // => 3
    add(1)(2)(3); // => 6
    add(1)(2)(3)(4); // => 10
    add(1)(2)(3)(4)(); // => 10
```
<p style="color:#d73a49">内容有点儿长，有些啰嗦，先码有时间可以详细看。</p>

### 步骤一：实现基本函数功能
　　实现基本的运算函数，如加、减、乘、除等。在这里借助于加法运算：
```javascript
    var add = function (a, b) {
        return a + b;
    }

    add(1, 2); // => 3
```

### 步骤二：柯理化
　　根据题目的分析，可以看出是对于每一个参数都进行了独立的操作，这里首选就是函数柯理化，因为柯理化函数的作用是**为每一个逻辑参数返回一个新函数**。

```javascript
    var currying = function (fn) {
        // 这里是讲原来的函数进行柯理化处理
        // 参数可以接收一个或多个，如果是多个直接进行运算
        // 如果是参数不满足运算结果则直接返回函数，接收参数
        var sum = 0;
        return function func(...args) {
            if (args.length === 0) {
                return sum;
            } else if (args.length === 1) {
                sum = fn(sum, args[0]);
            } else {
                sum = args.reduce(fn, sum);
            }
            return sum;
        }
    }

    add = currying(add);
    console.info(add(1)(2));
```
　　经过柯理化处理的函数能够分别对参数进行处理，但返回的是最终结果，不能进行再次调用，也就是无法实现无限调用，若实现无限调用则需要返回的是函数才行。

### 步骤三：无限累加的实现
　　实现无限累加，即实现的是无限函数调用，那么返回的结果就不能是一个值，而应该是一个函数，这个函数就是需要进行运算的柯理化后的函数。当再次调用时，原来的结果还需要再次参与到新的运算当中。
```javascript
var currying = function (fn) {
    var sum = 0;
    return function func(...args) {
        // 如果没有传递参数则返回计算结果，表示运算终结
        // 所以如果传递参数，就加上原有的计算结果
        if (args.length === 0) {
            return sum;
        } else {
            args.unshift(sum);// 使用数组原生方法 unshift 将原来的结果推入到参数列表当中
            sum = args.reduce(fn); // 所有的参数统一参与运算
            return func;
        }
    }
}

add = currying(add);
console.info(add(1, 2)());
```
### 步骤四：返回计算结果
　　在这里还有一个难点是返回结果为函数，如何在不调用的时候返回计算结果。从另一方面出发，打印函数的时候默认会调用 `toString()` 方法，那么要完成结果输出，可以利用打印函数是的操作，重写 `toString()` 方法。
```javascript
var currying = function (fn) {
    var sum = 0;
    function func(...args) {
        // 如果没有传递参数则返回计算结果，表示运算终结
        // 所以如果传递参数，就加上原有的计算结果
        if (args.length === 0) {
            return sum;
        } else {
            args.unshift(sum);// 使用数组原生方法 unshift 将原来的结果推入到参数列表当中
            sum = args.reduce(fn); // 所有的参数统一参与运算
            return func;
        }
    }
    func.toString = () => sum;
    return func;
}

add = currying(add);
console.info(add(1, 2)());
```

### 步骤五：最终的调整
　　经过步骤四的完善，已经基本保证了案例的内容实现，但是在多次调用的时候会发现一个问题，那就是所有的结果都是累加的，而不是根据每次调用重新计算。如果不考虑方法的复用显然到这里已经结束了，但是如果考虑函数的复用，就需要解决这个问题。需要在每次调用`add`函数的时候都进行依次结果的初始化。
　　经过一番实验，将内部执行分为两个阶段，第一阶段执行的函数用于完成数据的初始化，第二阶段之后进行函数的累加操作。虽然划分两个阶段，但是其中有个共性部分，就是加和运算。所以可以在第一阶段调用第二阶段的方法，完成相应的运算，返回第二阶段函数便于后续运算。
　　调整后的代码如下
```javascript
var currying = function (fn, defineVal = 0) {
    // defineVal 可以设置一个起始值
    return function (...args) { // 第一阶段调用的是这个函数
        // 在这里完成初始化
        var sum = defineVal;

        function func(...argts) { // 第二阶段之后调用的是这个函数
            if (args.length === 0) {
                return func.toString();
            } else {
                argts.unshift(sum);
                sum = argts.reduce(fn);
                return func;
            }
        }
        func.toString = () => sum;
        return func(...args); // 调用函数处理，返回相应结果
    }
}

var add = currying(add);
```
　　完善之后进行函数的测试，看是否满足最终的结果。
```javascript
    console.info(add(1)); // => 1
    console.info(add(1)(2)); // => 3
    console.info(add(1)(2)(3)); // => 6
    console.info(add(1, 2)(3)); // => 6
    console.info(add(1)(2, 3)); // => 6
    console.info(add(1, 2, 3)); // => 6
    console.info(add(1, 2, 3)(4)); // => 10
```
　　这里我们已经得到了结果，但是通过类型检测可以发现返回的结果是函数，如果要使用最终的返回结果值需要进行类型转换。

### 完结：最终代码

```javascript
    var add = function (a, b) {
        return a + b;
    }
    var currying = function (fn, defineVal = 0) {
        return function (...args) {
            var sum = defineVal;

            function func(...argts) {
                if (args.length === 0) {
                    return func.toString();
                } else {
                    argts.unshift(sum);
                    sum = argts.reduce(fn);
                    return func;
                }
            }
            func.toString = () => sum;
            return func(...args);
        }
    }
    var add = currying(add);
```