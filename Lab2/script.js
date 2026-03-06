var car1 = new Object();
car1.color = "Red";
car1.maxSpeed = 220;
car1.driver = {
    name: "Mariia Zamkova",
    category: "C",
    personalLimitations: "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;

var car2 = {
    color: "Blue",
    maxSpeed: 180,
    driver: {
        name: "Mariia Zamkova",
        category: "B",
        personalLimitations: null
    },
    tuning: false,
    "number of accidents": 2
};

car1.drive = function() {
    console.log("I am not driving at night");
};
car1.drive();

car2.drive = function() {
    console.log("I can drive anytime");
};
car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            var msg = "Driver " + this.driver.name;
            msg += this.driver.nightDriving ? " drives at night" : " does not drive at night";
            msg += " and has " + this.driver.experience + " years of experience";
            console.log(msg);
        }
    };
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

var truck1 = new Truck("White", 5000, 80, "Volvo", "FH16");
var truck2 = new Truck("Black", 4500, 85, "Scania", "R500");

truck1.AssignDriver("Олексій ", true, 5);
truck2.AssignDriver("Дмитро ", false, 10);

truck1.trip();
truck2.trip();

class Square {
    constructor(a) {
        this.a = a;
    }
    static help() {
        console.log("Квадрат — це правильний чотирикутник, у якого всі сторони рівні.");
    }
    length() {
        console.log("Сума сторін: " + (this.a * 4));
    }
    square() {
        console.log("Площа: " + (this.a * this.a));
    }
    info() {
        console.log(`Квадрат: сторона ${this.a}, кути по 90°, периметр: ${this.a * 4}, площа: ${this.a * this.a}`);
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }
    static help() {
        console.log("Прямокутник — чотирикутник, у якого всі кути прямі.");
    }
    length() {
        console.log("Сума сторін: " + (2 * (this.a + this.b)));
    }
    square() {
        console.log("Площа: " + (this.a * this.b));
    }
    info() {
        console.log(`Прямокутник: сторони ${this.a}, ${this.b}, кути по 90°, периметр: ${2 * (this.a + this.b)}, площа: ${this.a * this.b}`);
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this._alpha = alpha;
        this._beta = beta;
    }
    get alpha() { return this._alpha; }
    set alpha(value) { this._alpha = value; }
    get beta() { return this._beta; }
    set beta(value) { this._beta = value; }
    static help() {
        console.log("Ромб — паралелограм, у якого всі сторони рівні.");
    }
    length() {
        console.log("Сума сторін: " + (this.a * 4));
    }
    square() {
        let s = Math.pow(this.a, 2) * Math.sin(this._beta * Math.PI / 180);
        console.log("Площа: " + s.toFixed(2));
    }
    info() {
        console.log(`Ромб: сторона ${this.a}, кути ${this._alpha}°, ${this._beta}°, периметр: ${this.a * 4}`);
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }
    static help() {
        console.log("Паралелограм — чотирикутник, у якого протилежні сторони попарно паралельні.");
    }
    length() {
        console.log("Сума сторін: " + (2 * (this.a + this.b)));
    }
    square() {
        let s = this.a * this.b * Math.sin(this.beta * Math.PI / 180);
        console.log("Площа: " + s.toFixed(2));
    }
    info() {
        console.log(`Паралелограм: сторони ${this.a}, ${this.b}, кути ${this.alpha}°, ${this.beta}°, периметр: ${2 * (this.a + this.b)}`);
    }
}

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

const fig1 = new Square(5);
const fig2 = new Rectangle(4, 6);
const fig3 = new Rhombus(5, 120, 60);
const fig4 = new Parallelogram(4, 7, 110, 70);

fig1.info();
fig2.info();
fig3.info();
fig4.info();

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

const tri1 = Triangular();
const tri2 = Triangular(6, 8, 10);
const tri3 = Triangular(7, 7, 7);
console.log(tri1, tri2, tri3);

function PiMultiplier(factor) {
    return function() {
        return Math.PI * factor;
    };
}

const p1 = PiMultiplier(2);
const p2 = PiMultiplier(2/3);
const p3 = PiMultiplier(0.5);
console.log(p1(), p2(), p3());

function Painter(color) {
    return function(obj) {
        if (obj.type) {
            console.log(`Color: ${color}, Type: ${obj.type}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
const PaintYellow = Painter("Yellow");

const testObj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const testObj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
const testObj3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(testObj1);
PaintRed(testObj2);
PaintYellow(testObj3);
