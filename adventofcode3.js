const _ = require("lodash");
const fs = require("fs");

// Day 3: Part 1
const coordinateCreator = claim => {
  const dimensions = _.chain(claim)
    .split(/[\s:,x]/)
    .filter(Boolean)
    .drop(2)
    .value();

  var coordinatesArray = [];

  for (
    width = Number(dimensions[0]) + 1;
    width < Number(dimensions[0]) + Number(dimensions[2]) + 1;
    width++
  ) {
    for (
      height = Number(dimensions[1]) + 1;
      height < Number(dimensions[1]) + Number(dimensions[3]) + 1;
      height++
    ) {
      coordinatesArray.push([width, height]);
    }
  }

  return coordinatesArray;
};

const claimsOverlap = claims =>
  _.chain(claims)
    .split(/\n/)
    .map(coordinateCreator)
    .flatten()
    .countBy()
    .reduce((accum, value) => (value > 1 ? accum + 1 : accum), 0)
    .value();

console.log(
  claimsOverlap(fs.readFileSync("./puzzle_inputs/adventofcode3.txt"))
);

// Day 3: Part 2
const noOverlap = claims => {
  const claimsCoordinates = _.chain(claims)
    .split(/\n/)
    .map(claim => ({
      id: _.chain(claim)
        .split(/[#\s]/)
        .filter(Boolean)
        .head()
        .value(),
      coordinates: coordinateCreator(claim)
    }))
    .value();

  const claimsCoordinatesCount = _.chain(claimsCoordinates)
    .map("coordinates")
    .flatten()
    .countBy()
    .value();

  for (var each in claimsCoordinates) {
    const overlap = _.chain(claimsCoordinates[each])
      .get("coordinates")
      .reduce(
        (accum, value) =>
          claimsCoordinatesCount[value] === 1 ? accum : accum + 1,
        0
      )
      .value();

    if (overlap === 0) {
      return claimsCoordinates[each].id;
    }
  }
};

console.log(noOverlap(fs.readFileSync("./puzzle_inputs/adventofcode3.txt")));
