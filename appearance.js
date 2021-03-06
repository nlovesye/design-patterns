/**
 * @description 外观模式
 * 
1. 定义
为子系统中的一组接口提供一个一致的界面，定义一个高层接口，这个接口使子系统更加容易使用

2. 核心
可以通过请求外观接口来达到访问子系统，也可以选择越过外观来直接访问子系统

3. 实现
外观模式在JS中，可以认为是一组函数的集合
 */

 // 三个处理函数
function start() {
    console.log('start');
}

function doing() {
    console.log('doing');
}

function end() {
    console.log('end');
}

// 外观函数，将一些处理统一起来，方便调用
function execute() {
    start();
    doing();
    end();
}


// 调用init开始执行
function init() {
    // 此处直接调用了高层函数，也可以选择越过它直接调用相关的函数
    execute();
}

init(); // start doing end
