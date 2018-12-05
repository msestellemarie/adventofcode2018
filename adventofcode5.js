const _ = require("lodash");
const fs = require("fs");

// Day 5: Part 1
const isUpper = letter => _.toUpper(letter) === letter;

const isCorrectCase = pair => {
  if (isUpper(pair[0]) && isUpper(pair[1])) {
    return false;
  }
  if (!isUpper(pair[0]) && !isUpper(pair[1])) {
    return false;
  }
  return true;
};

const isSameLetter = pair => _.toUpper(pair[0]) === _.toUpper(pair[1]);

const reducePolymer = polymer => {
  for (i = 0; i < polymer.length - 1; i++) {
    const pair = polymer[i] + polymer[i + 1];

    if (isSameLetter(pair) && isCorrectCase(pair)) {
      return _.replace(polymer, new RegExp(pair, "g"), "");
    }
  }
  return polymer;
};

const remainingUnits = polymer => {
  while (true) {
    const reducedPolymer = reducePolymer(polymer);

    if (reducedPolymer === polymer) {
      return _.size(polymer);
    }

    polymer = reducedPolymer;
    reducePolymer(polymer);
  }
};

console.log(
  remainingUnits(fs.readFileSync("./puzzle_inputs/adventofcode5.txt", "utf8"))
);

//Day 5: Part 2
const removeUnitType = (type, polymer) =>
  _.replace(polymer, new RegExp(`[${_.toUpper(type)}${type}]`, "g"), "");

const improvedReducePolymer = polymer =>
  _.chain(polymer)
    .toLower()
    .uniq()
    .map(type => removeUnitType(type, polymer))
    .map(remainingUnits)
    .min()
    .value();

console.log(
  improvedReducePolymer(
    fs.readFileSync("./puzzle_inputs/adventofcode5.txt", "utf8")
  )
);
