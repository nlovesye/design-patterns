/**
 * @description 享元模式
 * 
1. 定义
享元（flyweight）模式是一种用于性能优化的模式，它的目标是尽量减少共享对象的数量

2. 核心
运用共享技术来有效支持大量细粒度的对象。
强调将对象的属性划分为内部状态（属性）与外部状态（属性）。内部状态用于对象的共享，通常不变；而外部状态则剥离开来，由具体的场景决定。

3. 实现
在程序中使用了大量的相似对象时，可以利用享元模式来优化，减少对象的数量
举个栗子，要对某个班进行身体素质测量，仅测量身高体重来评判


不过代码可能更复杂了，这个例子可能还不够充分，只是展示了享元模式如何实现，它节省了多个相似的对象，但多了一些操作。

factory对象有点像单例模式，只是多了一个sex的参数，如果没有内部状态，则没有参数的factory对象就更接近单例模式了
 */

 // 健康测量
function Fitness(sex) {
    this.sex = sex;
}

// 工厂，创建可共享的对象
var FitnessFactory = {
    objs: [],

    create: function(sex) {
        if (!this.objs[sex]) {
            this.objs[sex] = new Fitness(sex);
        }

        return this.objs[sex];
    }
};

// 管理器，管理非共享的部分
var FitnessManager = {
    fitnessData: {},
    
    // 添加一项
    add: function(name, sex, age, height, weight) {
        var fitness = FitnessFactory.create(sex);
        
        // 存储变化的数据
        this.fitnessData[name] = {
            age: age,
            height: height,
            weight: weight
        };

        return fitness;
    },
    
    // 从存储的数据中获取，更新至当前正在使用的对象
    updateFitnessData: function(name, obj) {
        var fitnessData = this.fitnessData[name];

        for (var item in fitnessData) {
            if (fitnessData.hasOwnProperty(item)) {
                obj[item] = fitnessData[item];
            }
        }
    }
};

// 开始评判
Fitness.prototype.judge = function(name) {
    // 操作前先更新当前状态（从外部状态管理器中获取）
    FitnessManager.updateFitnessData(name, this);

    var ret = name + ': ';

    if (this.sex === 'male') {
        ret += this.judgeMale();
    } else {
        ret += this.judgeFemale();
    }

    console.log(ret);
};

// 男性评判规则
Fitness.prototype.judgeMale = function() {
    var ratio = this.height / this.weight;

    return this.age > 20 ? (ratio > 3.5) : (ratio > 2.8);
};

// 女性评判规则
Fitness.prototype.judgeFemale = function() {
    var ratio = this.height / this.weight;
    
    return this.age > 20 ? (ratio > 4) : (ratio > 3);
};


var a = FitnessManager.add('A', 'male', 18, 160, 80);
var b = FitnessManager.add('B', 'male', 21, 180, 70);
var c = FitnessManager.add('C', 'female', 28, 160, 80);
var d = FitnessManager.add('D', 'male', 18, 170, 60);
var e = FitnessManager.add('E', 'female', 18, 160, 40);

// 开始评判
a.judge('A'); // A: false
b.judge('B'); // B: false
c.judge('C'); // C: false
d.judge('D'); // D: true
e.judge('E'); // E: true
