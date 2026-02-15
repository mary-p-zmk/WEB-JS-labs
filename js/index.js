console.log("Інструкція до функції triangle(val1, type1, val2, type2):");
console.log("Допустимі типи: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'.");
console.log("Приклад: triangle(4, 'leg', 8, 'hypotenuse');");

function triangle(val1, type1, val2, type2) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    let a, b, c, alpha, beta;

    // Спроба розпізнати комбінації аргументів
    const types = [type1, type2];
    const vals = [val1, val2];

    // Перевірка на від'ємні значення
    if (val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "failed";
    }

    try {
        // 1. Два катети
        if (types.includes("leg") && types.filter(t => t === "leg").length === 2) {
            a = vals[0];
            b = vals[1];
            c = Math.sqrt(a * a + b * b);
            alpha = toDeg(Math.atan(a / b));
            beta = 90 - alpha;
        }
        // 2. Катет і гіпотенуза
        else if (types.includes("leg") && types.includes("hypotenuse")) {
            a = vals[types.indexOf("leg")];
            c = vals[types.indexOf("hypotenuse")];
            if (a >= c) {
                console.log("Leg cannot be longer than or equal to hypotenuse");
                return "failed";
            }
            b = Math.sqrt(c * c - a * a);
            alpha = toDeg(Math.asin(a / c));
            beta = 90 - alpha;
        }
        // 3. Катет і прилеглий кут
        else if (types.includes("leg") && types.includes("adjacent angle")) {
            a = vals[types.indexOf("leg")];
            beta = vals[types.indexOf("adjacent angle")];
            if (beta >= 90) return "failed";
            alpha = 90 - beta;
            c = a / Math.cos(toRad(beta));
            b = Math.sqrt(c * c - a * a);
        }
        // 4. Катет і протилежний кут
        else if (types.includes("leg") && types.includes("opposite angle")) {
            a = vals[types.indexOf("leg")];
            alpha = vals[types.indexOf("opposite angle")];
            if (alpha >= 90) return "failed";
            beta = 90 - alpha;
            c = a / Math.sin(toRad(alpha));
            b = Math.sqrt(c * c - a * a);
        }
        // 5. Гіпотенуза і гострий кут
        else if (types.includes("hypotenuse") && types.includes("angle")) {
            c = vals[types.indexOf("hypotenuse")];
            alpha = vals[types.indexOf("angle")];
            if (alpha >= 90) return "failed";
            beta = 90 - alpha;
            a = c * Math.sin(toRad(alpha));
            b = c * Math.cos(toRad(alpha));
        }
        else {
            console.log("Wrong types or incompatible pair. Read instructions.");
            return "failed";
        }

        // Вивід результатів
        console.log(`a = ${+a.toFixed(2)}`);
        console.log(`b = ${+b.toFixed(2)}`);
        console.log(`c = ${+c.toFixed(2)}`);
        console.log(`alpha = ${+alpha.toFixed(2)}°`);
        console.log(`beta = ${+beta.toFixed(2)}°`);

        return "success";

    } catch (e) {
        console.log("An error occurred. Check your input.");
        return "failed";
    }
}