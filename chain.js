/**
 * @description 职责链模式
 * 
1. 定义
使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链 传递该请求，直到有一个对象处理它为止

2. 核心
请求发送者只需要知道链中的第一个节点，弱化发送者和一组接收者之间的强联系，可以便捷地在职责链中增加或删除一个节点，同样地，指定谁是第一个节点也很便捷

3. 实现
以展示不同类型的变量为例，设置一条职责链，可以免去多重if条件分支
 */

 // 定义链的某一项
function ChainItem(fn) {
    this.fn = fn;
    this.next = null;
}

ChainItem.prototype = {
    constructor: ChainItem,
    
    // 设置下一项
    setNext: function(next) {
        this.next = next;
        return next;
    },
    
    // 开始执行
    start: function() {
        this.fn.apply(this, arguments);
    },
    
    // 转到链的下一项执行
    toNext: function() {
        if (this.next) {
            this.start.apply(this.next, arguments);
        } else {
            console.log('无匹配的执行项目');
        }
    }
};

// 展示数字
function showNumber(num) {
    if (typeof num === 'number') {
        console.log('number', num);
    } else {
        // 转移到下一项
        this.toNext(num);
    }
}

// 展示字符串
function showString(str) {
    if (typeof str === 'string') {
        console.log('string', str);
    } else {
        this.toNext(str);
    }
}

// 展示对象
function showObject(obj) {
    if (typeof obj === 'object') {
        console.log('object', obj);
    } else {
        this.toNext(obj);
    }
}

var chainNumber = new ChainItem(showNumber);
var chainString = new ChainItem(showString);
var chainObject = new ChainItem(showObject);

// 设置链条
chainObject.setNext(chainNumber).setNext(chainString);

chainString.start('12'); // string 12
chainNumber.start({}); // 无匹配的执行项目
chainObject.start({}); // object {}
chainObject.start(123); // number 123

// 展示未定义
function showUndefined(obj) {
    if (typeof obj === 'undefined') {
        console.log('undefined');
    } else {
        this.toNext(obj);
    }
}

var chainUndefined = new ChainItem(showUndefined);
chainString.setNext(chainUndefined);

chainNumber.start(); // undefined
