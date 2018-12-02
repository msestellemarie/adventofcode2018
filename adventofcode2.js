const _ = require("lodash");

// Day 2: Part 1
const countValues = (number, boxIds) =>
  _.chain(boxIds)
    .split(/\n/)
    .map(boxId => _.countBy(boxId))
    .map(boxId => (_.includes(boxId, number) ? 1 : 0))
    .sum()
    .value();

const checkSum = boxIds => countValues(2, boxIds) * countValues(3, boxIds);

console.log(checkSum(process.argv[2]));

// Day 2: Part 2
const differenceBuilder = (string1, string2) => {
  var match = "";
  var difference = 0;

  for (each in string1) {
    if (string1[each] === string2[each]) {
      match += string1[each];
    } else {
      difference += 1;
    }
  }
  return { match, difference };
};

const commonLetters = (boxIds, differencesArray = []) => {
  const firstBoxId = _.head(boxIds);
  const remainingBoxIds = _.drop(boxIds);

  if (_.size(boxIds) === 1) {
    return _.chain(differencesArray)
      .find(["difference", 1])
      .get("match")
      .value();
  }

  for (each in remainingBoxIds) {
    differencesArray = _.concat(
      differencesArray,
      differenceBuilder(firstBoxId, remainingBoxIds[each])
    );
  }

  return commonLetters(remainingBoxIds, differencesArray);
};

console.log(commonLetters(_.split(process.argv[2], /\n/)));
