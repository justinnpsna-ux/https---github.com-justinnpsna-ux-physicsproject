let arr = [{a: 5, b:2, c:1}, {a: 2, b:9, c: 7}]

function a() {
    console.log("a function is caleled")
}

const spawnFunctions = {
    a: a
}

function myFunc() {
for (let obj of arr) {
    for (let [key, value] of Object.entries(obj)) {
        let actualFunction = spawnFunctions[key]
        actualFunction();
    continue;
    }
}
}

myFunc()