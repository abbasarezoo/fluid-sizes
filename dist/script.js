const pixelsPerRem = 16;

const minMaxCalculator = document.querySelector('.min-max-calculator');
const multiplierCalculator = document.querySelector('.multiplier-calculator');
const relativeCalculator = document.querySelector('.relative-calculator');

const minMaxInputs = minMaxCalculator.querySelectorAll('input');
const multiplierInputs = multiplierCalculator.querySelectorAll('input');
const relativeInputs = relativeCalculator.querySelectorAll('input');

const remInput = document.querySelector(".rem-value");

// Attach event listeners to each input field

remInput.addEventListener('input', function () {
  minMaxCalculation();
  multiplierCalculation();
  relativeCalculation();
});

minMaxInputs.forEach(function (input) {
  input.addEventListener('input', function () {
    minMaxCalculation();
  });
});

minMaxCalculation();

multiplierInputs.forEach(function (input) {
  input.addEventListener('input', function () {
    multiplierCalculation();
  });
});

multiplierCalculation();

relativeInputs.forEach(function (input) {
  input.addEventListener('input', function () {
    relativeCalculation();
  });
});

relativeCalculation();


function minMaxCalculation() {
  const minWidthInput = minMaxCalculator.querySelector(".min-width");
  const maxWidthInput = minMaxCalculator.querySelector(".max-width");
  const minFontSizeInput = minMaxCalculator.querySelector(".min-font-size");
  const maxFontSizeInput = minMaxCalculator.querySelector(".max-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minWidthInput.value);
  const maxWidthPx = parseFloat(maxWidthInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const maxFontSizePx = parseFloat(maxFontSizeInput.value);

  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = maxFontSizePx / remValue;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `clamp(${minFontSize.toFixed(4)}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem)`;
  const result = `font-size: ${output};`;
  const example = minMaxCalculator.querySelector('.example').style.setProperty('--min-max', output);

  minMaxCalculator.querySelector(".result").textContent = result;
}

function multiplierCalculation() {
  const minWidthInput = multiplierCalculator.querySelector(".min-width");
  const maxWidthInput = multiplierCalculator.querySelector(".max-width");
  const minFontSizeInput = multiplierCalculator.querySelector(".min-font-size");
  const multiplierInput = multiplierCalculator.querySelector(".multiplier");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minWidthInput.value);
  const maxWidthPx = parseFloat(maxWidthInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const multiplierValue = parseFloat(multiplierInput.value);

  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = minFontSizePx * multiplierValue / remValue;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `clamp(${minFontSize.toFixed(4)}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem)`;
  const result = `font-size: ${output};`;
  const example = multiplierCalculator.querySelector('.example').style.setProperty('--multiplier', output);

  multiplierCalculator.querySelector(".result").textContent = result;
}

function relativeCalculation() {
  const minWidthInput = relativeCalculator.querySelector(".min-width");
  const maxWidthInput = relativeCalculator.querySelector(".max-width");
  const minFontSizeInput = relativeCalculator.querySelector(".min-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minWidthInput.value);
  const maxWidthPx = parseFloat(maxWidthInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const ratioValue = maxWidthPx / minWidthPx - 1;
  const multiplier = ratioValue / 10 + 1;

  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = minFontSizePx * multiplier / remValue;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `clamp(${minFontSize.toFixed(4)}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem)`;
  const result = `font-size: ${output};`;
  const example = relativeCalculator.querySelector('.example').style.setProperty('--relative', output);

  relativeCalculator.querySelector(".result").textContent = result;
}