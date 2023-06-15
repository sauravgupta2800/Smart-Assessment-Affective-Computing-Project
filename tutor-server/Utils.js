// All Individuals Emotions
const types = [
  {
    name: "engagement",
    index: 2,
    calculate: function (prevPadValue, currValue) {
      return [
        prevPadValue[0] + currValue,
        prevPadValue[1] + currValue,
        prevPadValue[2] + currValue,
      ];
    },
  },
  {
    name: "excitement",
    index: 4,
    calculate: function (prevPadValue, currValue) {
      return [
        prevPadValue[0] + currValue,
        prevPadValue[1] + currValue,
        prevPadValue[2] - currValue,
      ];
    },
  },
  {
    name: "stress",
    index: 7,
    calculate: function (prevPadValue, currValue) {
      return [
        prevPadValue[0] - currValue,
        prevPadValue[1] + currValue,
        prevPadValue[2] - currValue,
      ];
    },
  },
  {
    name: "relax",
    index: 9,
    calculate: function (prevPadValue, currValue) {
      return [
        prevPadValue[0] + currValue,
        prevPadValue[1] - currValue,
        prevPadValue[2] + currValue,
      ];
    },
  },
  {
    name: "interest",
    index: 11,
    calculate: function (prevPadValue, currValue) {
      return [
        prevPadValue[0] + currValue,
        prevPadValue[1] + currValue,
        prevPadValue[2] - currValue,
      ];
    },
  },
  {
    name: "focus",
    index: 13,
    calculate: function (prevPadValue, currValue) {
      return [
        prevPadValue[0] + currValue,
        prevPadValue[1] - currValue,
        prevPadValue[2] + currValue,
      ];
    },
  },
];

// Normalising PAD Values

const normalizedCalculation = (array) => {
  var maxValue = Math.max(...array);
  var minValue = Math.min(...array);
  var range = Math.max(Math.abs(maxValue), Math.abs(minValue));

  var normalizedArray = array.map(function (value) {
    return value / range;
  });

  return normalizedArray;
};

// Calculating PAD Values

const padCalculation = (row) => {
  const rowValues = row.split(",").map((value) => parseFloat(value));
  console.log("row: ", rowValues);
  let padAxis = [0.0, 0.0, 0.0];
  const typeObj = {};
  types.forEach((type) => {
    padAxis = type.calculate(padAxis, rowValues[type.index]);
    typeObj[type.name] = rowValues[type.index];
    console.log("padAxis: ", padAxis);
  });

  var normalizedPadArr = normalizedCalculation(padAxis);

  console.log("normalizedPadArr: ", normalizedPadArr);
  return { pad: normalizedPadArr, types: typeObj };
};

module.exports = { padCalculation };
