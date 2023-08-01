console.log('Hello world');

// Primitive types
// When declare variables, better use "let" than "var", but "let" is only supported in ES6+
let number = 1; // number literal
let bool = true; // boolean literal
let string = 'string'; // string literal
let initial = undefined; // If variable is not assigned value, then it is "undefined";
let reset = null; // Contrast to "undefined", "null" is more common and can be used as a value to reset or an empty value, "null" is an object

// template string: `plain text or element tag text, ${variable}`
console.log(`number type: ${typeof number}`); // equals to |'number type: ' + typeof number|
console.log("bool type: " + typeof bool);
console.log("string type: " + typeof string);
console.log("initial type: " + typeof initial);
console.log("reset type: " + typeof reset);

let person = { // person is an object
    name: 'Calvin',
    age: 17,
    gender: 'male',
    phone: '133221313123121'
};

// property of object getter: object.property or object['property']
console.log(person.name);
console.log(person['phone']);

let list = [1, 2, 3, 4]; // list is an array object
console.log(list);

let greet = function(name) { // greet is a function
    console.log('Hello ' + name);
}
console.log('greet type: ' + typeof greet);
greet(person.name);