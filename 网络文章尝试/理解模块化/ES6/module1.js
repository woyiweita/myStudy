let name = "Nana";
let sayHi = function () {
    console.info(this);
    return `Hi! ${name}`;
}

export {
    name,
    sayHi
}