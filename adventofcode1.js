const _ = require("lodash");
const fs = require("fs");

// Day 1: Part 1
const frequencyChecker = frequencyChanges =>
  _.chain(frequencyChanges)
    .split(/\n/)
    .map(x => Number(x))
    .reduce((accum, value) => accum + value, 0)
    .value();

console.log(
  frequencyChecker(fs.readFileSync("./puzzle_inputs/adventofcode1.txt"))
);

// Day 1: Part 2
const frequencyRepeat = frequencyChanges => {
  const frequencyChangesArr = _.chain(frequencyChanges)
    .split(/\n/)
    .map(x => Number(x))
    .value();
  var frequenciesArr = [];
  var index = 0;
  var frequency = 0;

  while (true) {
    if (_.find(frequenciesArr, x => x === frequency) !== undefined) {
      return frequency;
    }
    frequenciesArr.push(frequency);
    frequency += frequencyChangesArr[index];
    index === frequencyChangesArr.length - 1 ? (index = 0) : (index += 1);
  }
};

console.log(
  frequencyRepeat(fs.readFileSync("./puzzle_inputs/adventofcode1.txt"))
);
