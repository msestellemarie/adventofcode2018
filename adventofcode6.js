const _ = require("lodash");
const fs = require("fs");

// Day 6: Part 1
const minCreator = (coordinates, index) =>
  _.chain(coordinates)
    .minBy(index)
    .nth(index)
    .value();

const maxCreator = (coordinates, index) =>
  _.chain(coordinates)
    .maxBy(index)
    .nth(index)
    .value();

const gridCreator = (minX, minY, maxX, maxY) => {
  var gridArr = [];

  for (i = minX; i <= maxX; i++) {
    for (j = minY; j <= maxY; j++) {
      gridArr.push([i, j]);
    }
  }

  return gridArr;
};

const manhattanDistance = (coord1, coord2) =>
  Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]);

const ownerCreator = (grid, coordinates) => {
  var ownerGrid = [];

  for (var i = 0; i < _.size(grid); i++) {
    var minDistance = 0;
    var noDuplicates = true;
    var owner = undefined;
    var sum = 0;

    for (var j = 0; j < _.size(coordinates); j++) {
      const currentDistance = manhattanDistance(coordinates[j], grid[i]);

      if (j === 0 || currentDistance < minDistance) {
        minDistance = currentDistance;
        owner = coordinates[j];
        noDuplicates = true;
      } else if (currentDistance === minDistance) {
        noDuplicates = false;
      }
    }

    if (noDuplicates) {
      ownerGrid.push({
        point: grid[i],
        owner
      });
    }
  }

  return ownerGrid;
};

const largestArea = (grid, coordinates, minX, minY, maxX, maxY) => {
  const owners = _.countBy(ownerCreator(grid, coordinates), "owner");

  return _.chain(coordinates)
    .filter(
      coordinate =>
        coordinate[0] > minX &&
        coordinate[0] < maxX &&
        coordinate[1] > minY &&
        coordinate[1] < maxY
    )
    .map(coordinate => _.join(coordinate, ","))
    .map(coordinate => owners[coordinate])
    .max()
    .value();
};

// Day 6: Part 2
const safeRegionSize = (grid, coordinates) => {
  var sumRegion = 0;

  for (var i = 0; i < _.size(grid); i++) {
    var sum = 0;

    for (var j = 0; j < _.size(coordinates); j++) {
      sum += manhattanDistance(coordinates[j], grid[i]);
    }

    if (sum < 10000) {
      sumRegion++;
    }
  }

  return sumRegion;
};

const adventOfCode6 = coordinates => {
  const coordinatesArray = _.chain(coordinates)
    .split(/\n/)
    .map(coordinate => _.split(coordinate, /,\s/))
    .map(coordinate => [_.toNumber(coordinate[0]), _.toNumber(coordinate[1])])
    .value();

  const minX = minCreator(coordinatesArray, 0);
  const minY = minCreator(coordinatesArray, 1);
  const maxX = maxCreator(coordinatesArray, 0);
  const maxY = maxCreator(coordinatesArray, 1);

  const grid = gridCreator(minX, minY, maxX, maxY);

  console.log(largestArea(grid, coordinatesArray, minX, minY, maxX, maxY));
  console.log(safeRegionSize(grid, coordinatesArray));
};

adventOfCode6(fs.readFileSync("./puzzle_inputs/adventofcode6.txt"));
