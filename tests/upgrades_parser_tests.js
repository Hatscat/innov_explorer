var util = require("util")
var upgrades_parser = require("../upgrades_parser.js")

// ---- true ---- //

console.log("\n# expecting 'true':\n")

console.log('upgrades_parser.encode([]) == "0"')
console.log(">>>", upgrades_parser.encode([]) == "0")

console.log('upgrades_parser.encode([0]) == "0"')
console.log(">>>", upgrades_parser.encode([0]) == "0")

console.log('upgrades_parser.encode([0,0]) == "0"')
console.log(upgrades_parser.encode([0,0]) == "0")

console.log('upgrades_parser.encode([1,1,2,2]) == "a5"')
console.log(">>>", upgrades_parser.encode([1,1,2,2]) == "a5")

console.log('upgrades_parser.encode([3,3,2,3,2,1,3,0,0,3,1,3,1,1,0,1,3,2,2,2]) == "ab45dc36ef"')
console.log(">>>", upgrades_parser.encode([3,3,2,3,2,1,3,0,0,3,1,3,1,1,0,1,3,2,2,2]) == "ab45dc36ef")

console.log('upgrades_parser.encode([3,3,2,3,2,1,3,0,0,3,1,3,1,1,0,1,3,2,2,2,1]) == "1ab45dc36ef"')
console.log(">>>", upgrades_parser.encode([3,3,2,3,2,1,3,0,0,3,1,3,1,1,0,1,3,2,2,2,1]) == "1ab45dc36ef")

console.log('util.inspect(upgrades_parser.decode("0")) == "[ 0, 0 ]"')
console.log(">>>", util.inspect(upgrades_parser.decode("0")) == "[ 0, 0 ]")

console.log('util.inspect(upgrades_parser.decode("2")) == "[ 2, 0 ]"')
console.log(">>>", util.inspect(upgrades_parser.decode("2")) == "[ 2, 0 ]")

console.log('util.inspect(upgrades_parser.decode("f")) == "[ 3, 3 ]"')
console.log(">>>", util.inspect(upgrades_parser.decode("f")) == "[ 3, 3 ]")

console.log('util.inspect(upgrades_parser.decode("a5")) == "[ 1, 1, 2, 2 ]"')
console.log(">>>", util.inspect(upgrades_parser.decode("a5")) == "[ 1, 1, 2, 2 ]")

console.log('util.inspect(upgrades_parser.decode("ab45dc36ef")) == "[ 3, 3, 2, 3, 2, 1, 3, 0, 0, 3, 1, 3, 1, 1, 0, 1, 3, 2, 2, 2 ]"')
console.log(">>>", util.inspect(upgrades_parser.decode("ab45dc36ef")) == "[ 3, 3, 2, 3, 2, 1, 3, 0, 0, 3, 1, 3, 1, 1, 0, 1, 3, 2, 2, 2 ]")

console.log('util.inspect(upgrades_parser.decode("1ab45dc36ef")) == "[ 3, 3, 2, 3, 2, 1, 3, 0, 0, 3, 1, 3, 1, 1, 0, 1, 3, 2, 2, 2, 1, 0 ]"')
console.log(">>>", util.inspect(upgrades_parser.decode("1ab45dc36ef")) == "[ 3, 3, 2, 3, 2, 1, 3, 0, 0, 3, 1, 3, 1, 1, 0, 1, 3, 2, 2, 2, 1, 0 ]")

// ---- false ---- //

//console.log("\n>>>> expecting 'false':\n")
