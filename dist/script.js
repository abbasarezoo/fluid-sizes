const minMaxCalculator = document.querySelector('.min-max-calculator');
const multiplierCalculator = document.querySelector('.multiplier-calculator');
const relativeCalculator = document.querySelector('.relative-calculator');

const remInput = document.querySelector('.rem-value');
const minInput = document.querySelector('.min-width');
const maxInput = document.querySelector('.max-width');

const minMaxInputs = minMaxCalculator.querySelectorAll('input');
const multiplierInputs = multiplierCalculator.querySelectorAll('input');
const relativeInputs = relativeCalculator.querySelectorAll('input');

remInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  relativeCalculation();
});

minInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  relativeCalculation();
});

maxInput.addEventListener('input', function() {
  minMaxCalculation();
  multiplierCalculation();
  relativeCalculation();
});

minMaxInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    minMaxCalculation();
  });
});

multiplierInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    multiplierCalculation();
  });
});

relativeInputs.forEach(function(input) {
  input.addEventListener('input', function() {
    relativeCalculation();
  });
});

window.addEventListener('resize', updateViewportWidth);

minMaxCalculation();
multiplierCalculation();
relativeCalculation();
updateViewportWidth();

function minMaxCalculation() {
  const minFontSizeInput = minMaxCalculator.querySelector(".min-font-size");
  const maxFontSizeInput = minMaxCalculator.querySelector(".max-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const maxFontSizePx = parseFloat(maxFontSizeInput.value);
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = maxFontSizePx / remValue;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${(slope * 100)}vw, ${maxFontSize}rem)`;
  const result = `${output};`;

  minMaxCalculator.querySelector('.fluid-example').style.setProperty('--min-max', output);
  minMaxCalculator.querySelector('.min-example').style.fontSize = minFontSize + 'rem';
  minMaxCalculator.querySelector('.max-example').style.fontSize = maxFontSize + 'rem';
  minMaxCalculator.querySelector(".result").textContent = result;
}

function multiplierCalculation() {
  const minFontSizeInput = multiplierCalculator.querySelector(".min-font-size");
  const multiplierInput = multiplierCalculator.querySelector(".multiplier");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const multiplierValue = parseFloat(multiplierInput.value);
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = (minFontSizePx * multiplierValue) / remValue;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${(slope * 100)}vw, ${maxFontSize}rem)`;
  const result = `${output};`;

  multiplierCalculator.querySelector('.fluid-example').style.setProperty('--multiplier', output);
  multiplierCalculator.querySelector('.min-example').style.fontSize = minFontSize + 'rem';
  multiplierCalculator.querySelector('.max-example').style.fontSize = maxFontSize + 'rem';
  multiplierCalculator.querySelector(".result").textContent = result;
}

function relativeCalculation() {
  const minFontSizeInput = relativeCalculator.querySelector(".min-font-size");

  const remValue = parseFloat(remInput.value);
  const minWidthPx = parseFloat(minInput.value);
  const maxWidthPx = parseFloat(maxInput.value);
  const minFontSizePx = parseFloat(minFontSizeInput.value);
  const ratioValue = (maxWidthPx / minWidthPx);
  const multiplier = (ratioValue / 10) + 1;
  
  const minWidth = minWidthPx / remValue;
  const maxWidth = maxWidthPx / remValue;
  const minFontSize = minFontSizePx / remValue;
  const maxFontSize = (minFontSizePx * multiplier) / remValue;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const output = `clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize.toFixed(4)}rem)`;
  const result = `${output};`;

  relativeCalculator.querySelector('.fluid-example').style.setProperty('--relative', output);
  relativeCalculator.querySelector('.min-example').style.fontSize = minFontSize + 'rem';
  relativeCalculator.querySelector('.max-example').style.fontSize = maxFontSize + 'rem';
  relativeCalculator.querySelector(".result").textContent = result;
}

function updateViewportWidth() {
  const viewportWidth = window.innerWidth;
  document.querySelector('.browser-width span').textContent = `${viewportWidth}px`;
}
