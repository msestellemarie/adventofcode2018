const _ = require("lodash");
const fs = require("fs");

// Day 5: Part 1
const replacePolymer = (polymer, regexString) =>
  _.replace(polymer, new RegExp(regexString, "g"), "");

const remainingUnits = polymer => {
  const regexString = _.chain(polymer)
    .toLower()
    .uniq()
    .map(unit => `${_.toUpper(unit)}${unit}|${unit}${_.toUpper(unit)}`)
    .join("|")
    .value();

  while (true) {
    const reducedPolymer = replacePolymer(polymer, regexString);

    if (reducedPolymer === polymer) {
      return _.size(polymer);
    }

    polymer = reducedPolymer;
    replacePolymer(polymer);
  }
};

console.log(
  remainingUnits(fs.readFileSync("./puzzle_inputs/adventofcode5.txt", "utf8"))
);

//Day 5: Part 2
const improvedReducePolymer = polymer =>
  _.chain(polymer)
    .toLower()
    .uniq()
    .map(type => replacePolymer(polymer, `[${_.toUpper(type)}${type}]`))
    .map(remainingUnits)
    .min()
    .value();

console.log(
  improvedReducePolymer(
    fs.readFileSync("./puzzle_inputs/adventofcode5.txt", "utf8")
  )
);
