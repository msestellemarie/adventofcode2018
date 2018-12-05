const _ = require("lodash");
const fs = require("fs");

// Day 4: Part 1
const messageCreator = message => {
  if (message === "falls asleep" || message === "wakes up") {
    return message;
  }
  return "begins shift";
};

const timeAsleepCreator = (start, end) =>
  (new Date(end) - new Date(start)) / 60000;

const asleepArrayCreator = (start, end) =>
  _.range(
    _.chain(start)
      .split(/[\s\:]/)
      .nth(2)
      .toNumber()
      .value(),
    _.chain(end)
      .split(/[\s\:]/)
      .nth(2)
      .toNumber()
      .value()
  );

const sleepiestGuard = records => {
  var guardRecords = {};
  var currentGuard = "";
  var startTime = "";
  var endTime = "";

  const sortedRecords = _.chain(records)
    .split(/\n/)
    .map(record => _.filter(_.split(record, /\[|\]\s/), Boolean))
    .sortBy()
    .map(record => {
      const guard = _.nth(record[1].match(/Guard #(\d+) begins shift/), 1);

      if (guard) {
        currentGuard = guard;
      }

      return {
        timestamp: record[0],
        message: messageCreator(record[1]),
        guard: currentGuard
      };
    })
    .value();

  for (var each in sortedRecords) {
    if (sortedRecords[each].message === "falls asleep") {
      startTime = sortedRecords[each].timestamp;
    } else if (sortedRecords[each].message === "wakes up") {
      endTime = sortedRecords[each].timestamp;

      guardRecords[sortedRecords[each].guard] = {
        asleepTotal: (guardRecords[
          sortedRecords[each].guard
        ].asleepTotal += timeAsleepCreator(startTime, endTime)),
        asleepArray: _.concat(
          guardRecords[sortedRecords[each].guard].asleepArray,
          asleepArrayCreator(startTime, endTime)
        )
      };
    } else if (!guardRecords[sortedRecords[each].guard]) {
      guardRecords[sortedRecords[each].guard] = {
        asleepTotal: 0,
        asleepArray: []
      };
    }
  }

  const guardId = _.chain(guardRecords)
    .map((asleep, guard) => ({ guard, asleep: asleep.asleepTotal }))
    .maxBy("asleep")
    .get("guard")
    .toNumber()
    .value();

  const mostCommonMinute = _.chain(guardRecords)
    .get(guardId)
    .get("asleepArray")
    .countBy()
    .map((value, minute) => ({ minute, value }))
    .maxBy("value")
    .get("minute")
    .toNumber()
    .value();

  return { guardRecords: guardRecords, solution: guardId * mostCommonMinute };
};

console.log(
  sleepiestGuard(fs.readFileSync("./puzzle_inputs/adventofcode4.txt"))
);

// Day 4: Part 2
const maxMinute = asleepArray =>
  _.chain(asleepArray)
    .countBy()
    .map((value, minute) => ({ minute, value }))
    .maxBy("value")
    .value();

const sleepiestGuardTwo = records => {
  const mostCommonMinute = _.chain(sleepiestGuard(records))
    .get("guardRecords")
    .map((asleep, guard) => ({
      guard,
      asleepMax: maxMinute(asleep.asleepArray)
    }))
    .maxBy(record => _.get(record, "asleepMax.value"))
    .value();

  return (
    _.chain(mostCommonMinute)
      .get("asleepMax.minute")
      .toNumber()
      .value() *
    _.chain(mostCommonMinute)
      .get("guard")
      .toNumber()
      .value()
  );
};

console.log(
  sleepiestGuardTwo(fs.readFileSync("./puzzle_inputs/adventofcode4.txt"))
);
